import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { actions } from '@/pages/login/slice';
import { user } from '@/pages/login/types';
import { refreshApi } from '@/utils/api/shared/refreshApi';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refreshToken = Cookies.get('refreshToken');
  const refresh = async () => {
    let header = {
      'Refresh-Token': refreshToken,
    };
    const response = await axios(refreshApi.refreshToken(header));
    dispatch(
      actions.setUser((prev: user) => {
        return {
          ...prev,
          accessToken: response?.data?.data.accessToken,
          refreshToken: response?.data?.data.refreshToken,
        };
      })
    );
    Cookies.set('accessToken', response?.data?.data.accessToken);
    Cookies.set('refreshToken', response?.data?.data.refreshToken);
    return response.data.data;
  };
  return refresh;
};

export default useRefreshToken;
