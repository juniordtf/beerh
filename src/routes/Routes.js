import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BrewStack from './BrewStack';
import ProductionsStack from './ProductionsStack';
import RecipesStack from './RecipesStack';
import StoveGrayIcon from '../../assets/StoveGrayIcon.png';
import StoveWhiteIcon from '../../assets/StoveWhiteIcon.png';
import RecipeGrayIcon from '../../assets/RecipeGrayIcon.png';
import RecipeWhiteIcon from '../../assets/RecipeWhiteIcon.png';
import ProductionGrayIcon from '../../assets/ProductionGrayIcon.png';
import ProductionWhiteIcon from '../../assets/ProductionWhiteIcon.png';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Produções"
      tabBarOptions={{
        activeTintColor: '#ffff',
        labelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        style: {
          backgroundColor: '#000000',
          height: 90,
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
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              color={color}
              size={size}
              source={focused ? ProductionWhiteIcon : ProductionGrayIcon}
            />
          ),
        }}
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
    </Tab.Navigator>
  );
}

export default MyTabs;
