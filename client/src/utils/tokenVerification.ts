import {jwtDecode} from 'jwt-decode';
import {TokenProps} from '@/interfaces/auth';
import getDateTimeInMillis from '@/utils/dateUtils';

export const verifyToken = ({token}: TokenProps) => {
  const decodedInfo = token ? jwtDecode(token) : undefined;
  if (!decodedInfo) return false;

  const expTime = decodedInfo?.exp;
  const currentTime = getDateTimeInMillis();

  if ((expTime as number) > currentTime) return true;
};

export const getDecodedInfo = ({token}: TokenProps) => {
  const decodedInfo = token ? jwtDecode<{email: string}>(token) : undefined;

  return decodedInfo;
};
