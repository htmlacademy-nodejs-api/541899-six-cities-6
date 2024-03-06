import { Container } from 'inversify';
import { COMPONENT } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { DefaultOfferService } from './default-offer.service.js';
import { Controller } from '../../libs/rest/index.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(COMPONENT.OFFER_SERVICE).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(COMPONENT.OFFER_MODEL).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(COMPONENT.OFFER_CONTROLLER).to(OfferController).inSingletonScope();

  return offerContainer;
}
