import * as joi from "joi";

export const registerSchema = joi.object().keys({
  fullName: joi.string().required().max(30).min(5),
  username: joi.string().required().max(20).min(5),
  numberCard: joi.number().required(),
});

export const registerLocationSchema = joi.object().keys({
  name: joi.string().required().max(30).min(5),
});
