import React, {useEffect} from 'react'
import NavBar from '../../components/navBar/Index'
import CustomTable from '../../components/CustomTable/Index';
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, getCoinData } from '../../features/coin/coinsListSlice';

const CoinList = () => {
  const {
    coins,
    loading,
    pagination,
  } = useSelector(getCoinData),
  dispatch = useDispatch();
  console.log(coins)

  

  useEffect(() => {
    let cb = () => {};
    if (pagination?.search) {
      // dispatch(setPagination({ page: 1 }));
      cb = setTimeout(
        (_) => (async () => await dispatch(fetchCoins()))(),
        700
      );
    } else cb = (async () => await dispatch(fetchCoins()))();

    return () => {
      clearTimeout(cb);
    };
  }, []);


  return (
    <div className=''>
        <NavBar />
        <CustomTable coins={coins}/>
    </div>
  )
}

export default CoinList