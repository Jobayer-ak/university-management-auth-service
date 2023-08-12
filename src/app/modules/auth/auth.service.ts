import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChanePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwt.helper';
import bcrypt from 'bcrypt';

const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // creating instace of user
  const user = new User();

  // access to our instance methods
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  // create access token && refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // const accessToken = jwt.sign(, config.jwt.secret as Secret, {
  //   expiresIn: config.jwt.expires_in
  // })

  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  // verify token

  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token
  const user = new User();

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist?.id,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

const changePasswordService = async (
  userInfo: JwtPayload | null,
  payload: IChanePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const user = new User();

  // checking user exists
  const isUserExist = await user.isUserExist(userInfo?.userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // checking old password
  if (
    isUserExist &&
    !(await user.isPasswordMatch(oldPassword, isUserExist.password as string))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect!');
  }

  // hash password before saving;
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  //query
  const query = { id: userInfo?.userId };

  //update password
  const updatedData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate(query, updatedData);
};

export const AuthService = {
  loginUserService,
  refreshTokenService,
  changePasswordService,
};
