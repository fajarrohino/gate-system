import * as joi from "joi";

export const checkSchema = joi.object().keys({
  mobileNO: joi.string().required(),
});
