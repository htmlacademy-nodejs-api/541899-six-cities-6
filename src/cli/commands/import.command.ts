import { Command } from '../interfaces/command.interface.js';
import { paintText } from '../../shared/helpers/support-functions.js';
import { getOfferFromString } from '../../shared/helpers/offer-formating-functions.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.contstants.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { UserService, DefaultUserService } from '../../shared/modules/user/index.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { DatabaseClient } from '../../shared/interfaces/database-client.interface.js';
import { TsvFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Logger } from '../../shared/interfaces/logger.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { Offer } from '../../shared/types/offer.type.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  getCommandName(): string {
    return '--import';
  }

  async execute(...parameters: string[]) {
    const [filename, login, password, host, dbname, salt] = parameters;
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('lineCompleted', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(paintText('error', 'Failed to import data from file'));
      console.error(paintText('error', `Error details: ${error.message}`));
    }
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = getOfferFromString(line);
    await this.createOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.log(paintText('content', `Has imported ${count} rows`));
  }

  private async createOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD,
    }, this.salt);

    await this.offerService.createOffer({
      name: offer.name,
      description: offer.description,
      date: offer.date,
      location: offer.location,
      previewImage: offer.previewImage,
      photos: offer.photos,
      isPremium: offer.isPremium,
      type: offer.type,
      numberOfRooms: offer.numberOfRooms,
      numberOfGuests: offer.numberOfGuests,
      price: offer.price,
      commodities: offer.commodities,
      userId: user.id,
      coordinates: offer.coordinates,
    });
  }
}
