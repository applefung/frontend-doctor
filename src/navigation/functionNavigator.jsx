import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs'
import FriendList from "../pages/FriendList/FriendList";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";

const FunctionsNavigator = createStackNavigator({
  Home: Home,
},                          
{
  mode:'modal',
  defaultNavigationOptions: {
      headerStyle:{
          // backgroundColor: Colors.primaryColor
      }
      
  }
});

const MessageNavigator = createStackNavigator({
  FriendList: FriendList,
  Chat: Chat,
},                          
{
  mode:'modal',
  defaultNavigationOptions: {
      headerStyle:{
          // backgroundColor: Colors.primaryColor
      }
      
  }
});

const UserTabNavigator = createBottomTabNavigator(
  {
      Home:FunctionsNavigator,
      Message: MessageNavigator
  }
  ,{
      mode:'modal',
     
      
  }
);

const MainNavigator = createSwitchNavigator({
  Main: UserTabNavigator,
})  

// export default createAppContainer(MainNavigator)
export default createAppContainer(MainNavigator)