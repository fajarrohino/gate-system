import * as joi from "joi";

export const checkSchema = joi.object().keys({
  name: joi.string().required(),
});
