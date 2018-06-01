import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListService } from "../../service/shopping-list/shopping-list.service";
import { Observable } from "rxjs/Observable";
import { Item } from "../../models/item/item.model";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingService : ShoppingListService) {
    this.shoppingList$ = this.shoppingService
                              .getShoppingList() // DB LISt
                              .snapshotChanges() // K : V pair
                              .map(
                                    changes =>{
                                      return changes.map(
                                          c => ({
                                            key : c.payload.key, ...c.payload.val() 
                                          })
                                      )
                                    }
                              )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
