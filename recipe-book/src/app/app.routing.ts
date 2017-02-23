import {Routes, RouterModule} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RECIPE_ROUTES} from "./recipes/recipes.routes";
/**
 * Created by Jamespc on 2/16/2017.
 */
const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
  {path: 'shopping-list', component: ShoppingListComponent }

]

export const routing = RouterModule.forRoot(APP_ROUTES);
