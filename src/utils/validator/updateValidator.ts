import * as joi from "joi";

export const updateSchema = joi.object().keys({
  mobileNo: joi.string().required(),
  topUp: joi.number().required(),
});
