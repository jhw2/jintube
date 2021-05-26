import React, { useEffect, useState, memo, useCallback } from 'react';
import SubscribeApi from '../../../../http/SubscribeApi';

const Subscribe = memo( ({history, userTo, userFrom})=>{
    const [subscribeCount, setSubscribeCount] = useState(0);
    const [subscribed, setSubscribed] = useState(false);

    const onSubscribe = useCallback(()=>{
        if(!userFrom){
            alert('로그인 후 구독가능합니다.');
            history.push("/login");
            return false;
        }
        if(subscribed){
            SubscribeApi.unSubscribed({userTo, userFrom}).then(response=>{
                if(!response.data.success){
                    alert('구독 해지 실패');
                    return false;
                }
                setSubscribeCount(subscribeCount-1);
                setSubscribed(false);
            })
        }else{
            SubscribeApi.onSubscribed({userTo, userFrom}).then(response=>{
                if(!response.data.success){
                    alert('구독 실패');
                    return false;
                }
                setSubscribeCount(subscribeCount+1);
                setSubscribed(true);
            })
        }
    },[subscribed, subscribeCount, userTo, userFrom, history])

    useEffect(()=>{
        SubscribeApi.getSubscribeCount({userTo}).then(response=>{
            if(!response.data.success){
                alert('구독수 조회 실패');
                return false;
            }
            setSubscribeCount(response.data.subscribeCount);
            setSubscribed(response.data.subscribed);
        });
        SubscribeApi.getSubscribed({userTo, userFrom}).then(response=>{
            if(!response.data.success){
                alert('구독 조회 실패');
                return false;
            }
        });
    },[userTo, userFrom]);
    return(
        <div>
            <button onClick={onSubscribe} className={subscribed ? 'subscribe subscribed':'subscribe'}>{subscribeCount} {subscribed ? 'Subscribed':'Subscribe'}</button>
        </div>
    )
})
export default Subscribe;