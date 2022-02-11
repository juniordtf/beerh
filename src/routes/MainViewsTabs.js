import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BrewStack from './BrewStack';
import ProductionsStack from './ProductionsStack';
import RecipesStack from './RecipesStack';
import MenuStack from './MenuStack';
import StoveGrayIcon from '../../assets/StoveGrayIcon.png';
import StoveWhiteIcon from '../../assets/StoveWhiteIcon.png';
import RecipeGrayIcon from '../../assets/RecipeGrayIcon.png';
import RecipeWhiteIcon from '../../assets/RecipeWhiteIcon.png';
import ProductionGrayIcon from '../../assets/ProductionGrayIcon.png';
import ProductionWhiteIcon from '../../assets/ProductionWhiteIcon.png';
import MenuGrayIcon from '../../assets/menu_gray.png';
import MenuWhiteIcon from '../../assets/menu_white.png';

const Tab = createBottomTabNavigator();

function MainViewTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Produções"
      tabBarOptions={{
        activeTintColor: '#ffff',
        labelStyle: {
          fontSize: 12,
          marginBottom: 7,
        },
        style: {
          backgroundColor: '#232324',
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Brassagem"
        component={BrewStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              color={color}
              size={size}
              source={focused ? StoveWhiteIcon : StoveGrayIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Produções"
        component={ProductionsStack}
        options={(route) => ({
          tabBarIcon: ({color, size, focused}) => (
            <Image
              color={color}
              size={size}
              source={focused ? ProductionWhiteIcon : ProductionGrayIcon}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Receitas"
        component={RecipesStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              color={color}
              size={size}
              source={focused ? RecipeWhiteIcon : RecipeGrayIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              color={color}
              size={size}
              source={focused ? MenuWhiteIcon : MenuGrayIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainViewTabs;
