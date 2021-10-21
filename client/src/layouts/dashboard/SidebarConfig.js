import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

let sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'My Account',
    path: '/dashboard/myaccount',
    icon: getIcon(peopleFill)
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'My Cart',
    path: '/dashboard/MyCart',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'My Orders',
    path: '/dashboard/CartNew',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'My Wishlist',
    path: '/dashboard/MyWishlist',
    icon: getIcon(fileTextFill)
  },
];

if(JSON.parse(localStorage.getItem('auth'))===null){
  sidebarConfig.push( {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  } 
  );
  sidebarConfig.push({
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  })
}

export default sidebarConfig;
