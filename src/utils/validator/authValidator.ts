import * as joi from "joi";

export const registerSchema = joi.object().keys({
  fullName: joi.string().required().max(30).min(5),
  username: joi.string().required().max(20).min(5),
  mobileNo: joi.string().required().max(12),
  nameBank: joi.string().required(),
  balance: joi.number().required(),
});

export const registerLocationSchema = joi.object().keys({
  name: joi.string().required().max(30).min(5),
  gateId: joi.number().required(),
});

export const registerBankSchema = joi.object().keys({
  nameBank: joi.string().required().max(20).min(2),
  codeBank: joi.string().required().max(3),
});
