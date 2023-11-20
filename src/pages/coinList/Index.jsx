import React, {useEffect} from 'react'
import NavBar from '../../components/navBar/Index'
import CustomTable from '../../components/CustomTable/Index';
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, setPagination, selectCoins, selectPagination } from '../../features/coin/coinsListSlice';

const CoinList = () => {
const {coins} = useSelector(selectCoins),
pagination = useSelector(selectPagination),
dispatch = useDispatch();

  useEffect(() => {
    let cb = () => {};
    if (pagination?.current_page) {
      dispatch(setPagination({ page: 1 }));
      cb = setTimeout(
        (_) => (async () => await dispatch(fetchCoins()))(),
        700
      );
    } else cb = (async () => await dispatch(fetchCoins()))();

    return () => {
      clearTimeout(cb);
    };
  }, [dispatch, pagination.current_page]);


  return (
    <div className=''>
        <NavBar />
        <CustomTable 
        {...{
          pagination,
          setPagination,
          coins
        }}/>
    </div>
  )
}

export default CoinList