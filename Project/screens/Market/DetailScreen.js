import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Detail from '../../components/Detail';
import { selectStock, getAbout, getCompanyNews, selectPrice, getPeers, getCandle } from '../../scr/actions';


export default function DetailScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const item = useSelector(state => state.item);

  useEffect(() => {
    dispatch(selectPrice(item.symbol));
    dispatch(selectStock(item));
    dispatch(getCompanyNews(item.symbol, getFrom(), getTo()));
    dispatch(getAbout(item.symbol));
    dispatch(getPeers(item.symbol));
    dispatch(getCandle(item.symbol, time()-86400, time()));
    setLoading(false);
  });

  const time = () => {
    var today = Math.floor(new Date()/1000);
    return(today);
  };

  const getTo = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    return(
      today
    );
  };

  const getFrom = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if(mm === 0) {
      mm = 12;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return(
      today
    );
  };

  return(
    <>
      {loading && <ActivityIndicator size="large" color="#05668d" />}
      {!loading && <Detail/>}
    </>
  );
}