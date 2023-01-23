import {Component, OnInit} from '@angular/core';
import {Place, Position} from "../../../../model/Position";
import {MapService} from "../../../../services/map.service";
import {Output, EventEmitter, Input} from '@angular/core';
import {CarTypeService} from "../../../../services/car-type.service";
import {PositionDTO} from "../../../../model/PositionDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MapSearchEstimations} from "../../../../model/MapSearchEstimations";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RideCreate} from "../../../../model/RideCreate";
import {RideService} from "../../../../services/ride.service";
import {FriendEmailDTO} from "../../../../model/FriendEmailDTO";
import {Customer, User} from "../../../../model/User";
import {PaymentDTO} from "../../../../model/PaymentDTO";
import {DecrementTokens} from "../../../../store/actions/tokens.action";
import {RideDetails} from "../../../../model/RideDetails";
import {Store} from "@ngxs/store";
import {LeafletRoute} from "../../../../model/LeafletRoute";
import {CustomersService} from "../../../../services/customers.service";

@Component({
  selector: 'app-search-directions-customer',
  templateUrl: './search-directions-customer.component.html',
  styleUrls: ['./search-directions-customer.component.css']
})
export class SearchDirectionsCustomerComponent implements OnInit {
  positions: (Place | null)[];
  @Input() estimations: MapSearchEstimations
  @Input() selectedRoute: LeafletRoute[]
  @Input() loggedUser: User
  @Output() addPinsToMap = new EventEmitter<Place[]>();
  @Output() getSelectedCarType = new EventEmitter<string>();
  @Output() optimizeByPrice = new EventEmitter()
  @Output() optimizeByTime = new EventEmitter()
  carTypes: string[];
  canOptimize: boolean;
  friends: ({ friendEmail: string })[];
  hasPet: boolean;
  hasChild: boolean;

  firstFormGroup: FormGroup;
  destinationsForm: any;
  carTypeFormGroup: any;
  secondFormGroup: FormGroup;
  friendsFormGroup: FormGroup;
  timeOfRide: String
  typeOfRequest: string;
  isActive: boolean;

  constructor(private customerService: CustomersService, private store: Store, private mapService: MapService, private rideService: RideService, private carTypeService: CarTypeService, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder) {
    this.friends = []
    this.typeOfRequest = "now"
    this.hasChild = false;
    this.hasPet = false;
    this.timeOfRide = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    this.canOptimize = false
  }

  get destinations() {
    return (<FormArray>this.destinationsForm.get('destinations'))
  }

  get carType() {
    return (<FormArray>this.carTypeFormGroup.get('carType'))
  }

  get newFriend() {
    return (<FormControl>this.friendsFormGroup.get('newFriend'))
  }

  ngOnInit(): void {
    this.customerService.getById(this.loggedUser.email).subscribe((customer:Customer) => {
      this.isActive = customer.isActive
    })

    this.carTypeService.getCarTypes().subscribe({
      next: (carTypeGetResponse) => {
        this.carTypes = []
        carTypeGetResponse.forEach((type) => {
          this.carTypes.push(type.name);
        })
      },
    });
    this.destinationsForm = new FormGroup({
      destinations: new FormArray([
        new FormControl("", Validators.required),
        new FormControl("", Validators.required)
      ]),
    })
    this.carTypeFormGroup = new FormGroup({
      carType: new FormControl("", Validators.required)
    })

    this.firstFormGroup = new FormGroup({groups: this.destinationsForm});
    this.secondFormGroup = new FormGroup({groups: this.carTypeFormGroup});
    this.friendsFormGroup = new FormGroup({
      newFriend: new FormControl("", [Validators.required, Validators.email])
    })

  }

  addNewDestination() {
    this.destinations.push(new FormControl("", Validators.required))
    console.log(this.destinations)
  }

  removeDestination(number: number) {
    this.destinations.removeAt(number)
  }

  clearInputFields() {
    this.destinations.controls.forEach((destination) => {
      destination.setValue(null)
    })
    console.log(this.destinations.value)
  }

  async showEstimates() {
    if (!validInput(this.destinations.controls)) {
      this._snackBar.open("Please enter all existing locations!", '', {
        duration: 3000,
        panelClass: ['snack-bar']
      })
      return
    }
    this.positions = [];
    await this.calculatePositionsSearch()

    if (validOutput(this.positions)) {
      this.addPinsToMap.emit(castToPlace(this.positions))
    } else {
      this._snackBar.open("Please enter all existing locations!", '', {
        duration: 3000,
        panelClass: ['snack-bar']
      })
    }
    this.canOptimize = true;

    function validInput(destinations: any[]) {
      let isValid = true
      destinations.forEach((destination) => {
        if (destination.value == "") {
          isValid = false
        }
      })
      return isValid
    }

    function validOutput(positions: (Place | null)[]) {
      let isValid = true
      positions.forEach((position) => {
        if (position == undefined) {
          isValid = false;
        }
      })
      return isValid;
    }

    function castToPlace(positions: (Place | null)[]) {
      let retPositions: Place[] = []
      positions.forEach((position) => {
        if (position != null) {
          retPositions.push(position)
        }
      })
      return retPositions
    }
  }

  calculatePositionsSearch() {
    return new Promise(resolve => {
      for (let i = 0; i < this.destinations.value.length; i++) {
        let destination = this.destinations.value[i]
        this.mapService.findAddress(destination).subscribe((response: Object) => {
          let positions: PositionDTO[] = Object.values(response)
          if (positions.length == 0) {
            this.positions[i] = null
          } else {
            let position = new Position()
            console.log(response)
            position.x = Object.values(response)[0].lon
            position.y = Object.values(response)[0].lat
            this.positions[i] = {
              "position": position,
              "name": destination
            }
          }
        })
      }
      setTimeout(() => {
        resolve('resolved');
      }, 3000);
    });
  }


  setDestination(text: string, i: number) {
  }

  changeCarType(event: string) {
    console.log(event)
    this.getSelectedCarType.emit(this.carType.value)
  }


  optimizePrice() {
    this.optimizeByPrice.emit()
  }

  optimizeTime() {
    this.optimizeByTime.emit()
  }

  reserveRide() {

  }

  getRoute() {
    let mergedRoute = new RideCreate();
    this.selectedRoute.forEach((partOfRoute: LeafletRoute, index: number) => {
      if (index != 0) {
        partOfRoute.coordinates.shift()
      }
      mergedRoute.coordinates = mergedRoute.coordinates.concat(partOfRoute.coordinates)
      mergedRoute.instructions = mergedRoute.instructions.concat(partOfRoute.instructions)
      mergedRoute.totalDistance = mergedRoute.totalDistance + partOfRoute.summary.totalDistance
      mergedRoute.totalTime = mergedRoute.totalTime + partOfRoute.summary.totalTime
      mergedRoute.numberOfRoute[index] = partOfRoute.routesIndex
    })
    return mergedRoute;
  }

  requestRide() {
    let payment = new PaymentDTO();
    payment.customerThatPayed = this.loggedUser.email
    payment.totalPrice = +this.estimations.price
    let route = this.getRoute()
    let ride = new RideCreate()
    console.log(route)
    ride.coordinates = route.coordinates
    ride.instructions = route.instructions
    ride.carType = this.carType.value
    ride.hasPet = this.hasPet
    ride.hasChild = this.hasChild
    ride.totalDistance = route.totalDistance
    ride.totalTime = route.totalTime
    ride.reservationTime = this.timeOfRide
    ride.route = this.positions
    ride.numberOfRoute = route.numberOfRoute
    ride.payment = payment
    ride.passengers = [this.loggedUser.email]
    ride.reservation = this.typeOfRequest === "reserve"
    this.friends.forEach((friend: FriendEmailDTO) => {
      ride.passengers.push(friend.friendEmail)
    })
    console.log(ride)

    this.rideService.createRideRequest(ride).subscribe({
      next: (res: RideDetails) => {
        this.store.dispatch([new DecrementTokens(res.payment.customers[0].pricePerCustomer)])
        this._snackBar.open("Successfully reserved ride", '', {
          duration: 3000,
          panelClass: ['snack-bar']
        })
      },
      error: (res: any) => {
        console.log(res)
        this._snackBar.open(res.error, '', {
          duration: 3000,
          panelClass: ['snack-bar']
        })
      }
    })


  }

  removeFriend(i: number) {
    this.friends = this.friends.filter(function (elem, index) {
      return index != i;
    });
  }

  addFriend() {
    if (this.newFriend.invalid) {
      return
    }
    this.friends.push({friendEmail: this.newFriend.value})
    this.newFriend.reset()
  }
}
