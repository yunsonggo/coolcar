import * as $protobuf from "protobufjs";
// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rental = $root.rental = (() => {

    /**
     * Namespace rental.
     * @exports rental
     * @namespace
     */
    const rental = {};

    rental.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof rental
         * @namespace
         */
        const v1 = {};

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof rental.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof rental.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {rental.v1.ILocation=} [properties] Properties to set
             */
            function Location(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Location latitude.
             * @member {number} latitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Location)
                    return object;
                let message = new $root.rental.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Location
             * @static
             * @param {rental.v1.Location} message Location
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Location.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.latitude = 0;
                    object.longitude = 0;
                }
                if (message.latitude != null && message.hasOwnProperty("latitude"))
                    object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
                if (message.longitude != null && message.hasOwnProperty("longitude"))
                    object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
                return object;
            };

            /**
             * Converts this Location to JSON.
             * @function toJSON
             * @memberof rental.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.LocationStatus = (function() {

            /**
             * Properties of a LocationStatus.
             * @memberof rental.v1
             * @interface ILocationStatus
             * @property {rental.v1.ILocation|null} [location] LocationStatus location
             * @property {string|null} [locationName] LocationStatus locationName
             * @property {number|null} [kmDriven] LocationStatus kmDriven
             * @property {number|null} [feeCent] LocationStatus feeCent
             * @property {number|null} [timestampSec] LocationStatus timestampSec
             */

            /**
             * Constructs a new LocationStatus.
             * @memberof rental.v1
             * @classdesc Represents a LocationStatus.
             * @implements ILocationStatus
             * @constructor
             * @param {rental.v1.ILocationStatus=} [properties] Properties to set
             */
            function LocationStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LocationStatus location.
             * @member {rental.v1.ILocation|null|undefined} location
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.location = null;

            /**
             * LocationStatus locationName.
             * @member {string} locationName
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.locationName = "";

            /**
             * LocationStatus kmDriven.
             * @member {number} kmDriven
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.kmDriven = 0;

            /**
             * LocationStatus feeCent.
             * @member {number} feeCent
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.feeCent = 0;

            /**
             * LocationStatus timestampSec.
             * @member {number} timestampSec
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.timestampSec = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.LocationStatus} LocationStatus
             */
            LocationStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.LocationStatus)
                    return object;
                let message = new $root.rental.v1.LocationStatus();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".rental.v1.LocationStatus.location: object expected");
                    message.location = $root.rental.v1.Location.fromObject(object.location);
                }
                if (object.locationName != null)
                    message.locationName = String(object.locationName);
                if (object.kmDriven != null)
                    message.kmDriven = Number(object.kmDriven);
                if (object.feeCent != null)
                    message.feeCent = object.feeCent | 0;
                if (object.timestampSec != null)
                    if ($util.Long)
                        (message.timestampSec = $util.Long.fromValue(object.timestampSec)).unsigned = false;
                    else if (typeof object.timestampSec === "string")
                        message.timestampSec = parseInt(object.timestampSec, 10);
                    else if (typeof object.timestampSec === "number")
                        message.timestampSec = object.timestampSec;
                    else if (typeof object.timestampSec === "object")
                        message.timestampSec = new $util.LongBits(object.timestampSec.low >>> 0, object.timestampSec.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {rental.v1.LocationStatus} message LocationStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LocationStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.location = null;
                    object.locationName = "";
                    object.kmDriven = 0;
                    object.feeCent = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestampSec = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestampSec = options.longs === String ? "0" : 0;
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.rental.v1.Location.toObject(message.location, options);
                if (message.locationName != null && message.hasOwnProperty("locationName"))
                    object.locationName = message.locationName;
                if (message.kmDriven != null && message.hasOwnProperty("kmDriven"))
                    object.kmDriven = options.json && !isFinite(message.kmDriven) ? String(message.kmDriven) : message.kmDriven;
                if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                    object.feeCent = message.feeCent;
                if (message.timestampSec != null && message.hasOwnProperty("timestampSec"))
                    if (typeof message.timestampSec === "number")
                        object.timestampSec = options.longs === String ? String(message.timestampSec) : message.timestampSec;
                    else
                        object.timestampSec = options.longs === String ? $util.Long.prototype.toString.call(message.timestampSec) : options.longs === Number ? new $util.LongBits(message.timestampSec.low >>> 0, message.timestampSec.high >>> 0).toNumber() : message.timestampSec;
                return object;
            };

            /**
             * Converts this LocationStatus to JSON.
             * @function toJSON
             * @memberof rental.v1.LocationStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LocationStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LocationStatus;
        })();

        /**
         * TripStatus enum.
         * @name rental.v1.TripStatus
         * @enum {number}
         * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
         * @property {number} IN_PROGRESS=1 IN_PROGRESS value
         * @property {number} FINISHED=2 FINISHED value
         */
        v1.TripStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "IN_PROGRESS"] = 1;
            values[valuesById[2] = "FINISHED"] = 2;
            return values;
        })();

        v1.Trip = (function() {

            /**
             * Properties of a Trip.
             * @memberof rental.v1
             * @interface ITrip
             * @property {string|null} [accountId] Trip accountId
             * @property {string|null} [gunId] Trip gunId
             * @property {rental.v1.ILocationStatus|null} [start] Trip start
             * @property {rental.v1.ILocationStatus|null} [current] Trip current
             * @property {rental.v1.ILocationStatus|null} [end] Trip end
             * @property {rental.v1.TripStatus|null} [status] Trip status
             * @property {string|null} [identityId] Trip identityId
             */

            /**
             * Constructs a new Trip.
             * @memberof rental.v1
             * @classdesc Represents a Trip.
             * @implements ITrip
             * @constructor
             * @param {rental.v1.ITrip=} [properties] Properties to set
             */
            function Trip(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Trip accountId.
             * @member {string} accountId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.accountId = "";

            /**
             * Trip gunId.
             * @member {string} gunId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.gunId = "";

            /**
             * Trip start.
             * @member {rental.v1.ILocationStatus|null|undefined} start
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.start = null;

            /**
             * Trip current.
             * @member {rental.v1.ILocationStatus|null|undefined} current
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.current = null;

            /**
             * Trip end.
             * @member {rental.v1.ILocationStatus|null|undefined} end
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.end = null;

            /**
             * Trip status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.status = 0;

            /**
             * Trip identityId.
             * @member {string} identityId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.identityId = "";

            /**
             * Creates a Trip message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Trip
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Trip} Trip
             */
            Trip.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Trip)
                    return object;
                let message = new $root.rental.v1.Trip();
                if (object.accountId != null)
                    message.accountId = String(object.accountId);
                if (object.gunId != null)
                    message.gunId = String(object.gunId);
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.Trip.start: object expected");
                    message.start = $root.rental.v1.LocationStatus.fromObject(object.start);
                }
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.Trip.current: object expected");
                    message.current = $root.rental.v1.LocationStatus.fromObject(object.current);
                }
                if (object.end != null) {
                    if (typeof object.end !== "object")
                        throw TypeError(".rental.v1.Trip.end: object expected");
                    message.end = $root.rental.v1.LocationStatus.fromObject(object.end);
                }
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                if (object.identityId != null)
                    message.identityId = String(object.identityId);
                return message;
            };

            /**
             * Creates a plain object from a Trip message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Trip
             * @static
             * @param {rental.v1.Trip} message Trip
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Trip.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accountId = "";
                    object.gunId = "";
                    object.start = null;
                    object.current = null;
                    object.end = null;
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                    object.identityId = "";
                }
                if (message.accountId != null && message.hasOwnProperty("accountId"))
                    object.accountId = message.accountId;
                if (message.gunId != null && message.hasOwnProperty("gunId"))
                    object.gunId = message.gunId;
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.LocationStatus.toObject(message.start, options);
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.LocationStatus.toObject(message.current, options);
                if (message.end != null && message.hasOwnProperty("end"))
                    object.end = $root.rental.v1.LocationStatus.toObject(message.end, options);
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                if (message.identityId != null && message.hasOwnProperty("identityId"))
                    object.identityId = message.identityId;
                return object;
            };

            /**
             * Converts this Trip to JSON.
             * @function toJSON
             * @memberof rental.v1.Trip
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Trip.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Trip;
        })();

        v1.TripEntity = (function() {

            /**
             * Properties of a TripEntity.
             * @memberof rental.v1
             * @interface ITripEntity
             * @property {string|null} [id] TripEntity id
             * @property {rental.v1.ITrip|null} [trip] TripEntity trip
             */

            /**
             * Constructs a new TripEntity.
             * @memberof rental.v1
             * @classdesc Represents a TripEntity.
             * @implements ITripEntity
             * @constructor
             * @param {rental.v1.ITripEntity=} [properties] Properties to set
             */
            function TripEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TripEntity id.
             * @member {string} id
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.id = "";

            /**
             * TripEntity trip.
             * @member {rental.v1.ITrip|null|undefined} trip
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.trip = null;

            /**
             * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.TripEntity} TripEntity
             */
            TripEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.TripEntity)
                    return object;
                let message = new $root.rental.v1.TripEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.trip != null) {
                    if (typeof object.trip !== "object")
                        throw TypeError(".rental.v1.TripEntity.trip: object expected");
                    message.trip = $root.rental.v1.Trip.fromObject(object.trip);
                }
                return message;
            };

            /**
             * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {rental.v1.TripEntity} message TripEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TripEntity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.trip = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.trip != null && message.hasOwnProperty("trip"))
                    object.trip = $root.rental.v1.Trip.toObject(message.trip, options);
                return object;
            };

            /**
             * Converts this TripEntity to JSON.
             * @function toJSON
             * @memberof rental.v1.TripEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TripEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TripEntity;
        })();

        v1.CreateTripRequest = (function() {

            /**
             * Properties of a CreateTripRequest.
             * @memberof rental.v1
             * @interface ICreateTripRequest
             * @property {rental.v1.ILocation|null} [start] CreateTripRequest start
             * @property {string|null} [gunId] CreateTripRequest gunId
             * @property {string|null} [avatarUrl] CreateTripRequest avatarUrl
             */

            /**
             * Constructs a new CreateTripRequest.
             * @memberof rental.v1
             * @classdesc Represents a CreateTripRequest.
             * @implements ICreateTripRequest
             * @constructor
             * @param {rental.v1.ICreateTripRequest=} [properties] Properties to set
             */
            function CreateTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateTripRequest start.
             * @member {rental.v1.ILocation|null|undefined} start
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.start = null;

            /**
             * CreateTripRequest gunId.
             * @member {string} gunId
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.gunId = "";

            /**
             * CreateTripRequest avatarUrl.
             * @member {string} avatarUrl
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.avatarUrl = "";

            /**
             * Creates a CreateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateTripRequest} CreateTripRequest
             */
            CreateTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateTripRequest)
                    return object;
                let message = new $root.rental.v1.CreateTripRequest();
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.CreateTripRequest.start: object expected");
                    message.start = $root.rental.v1.Location.fromObject(object.start);
                }
                if (object.gunId != null)
                    message.gunId = String(object.gunId);
                if (object.avatarUrl != null)
                    message.avatarUrl = String(object.avatarUrl);
                return message;
            };

            /**
             * Creates a plain object from a CreateTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {rental.v1.CreateTripRequest} message CreateTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.start = null;
                    object.gunId = "";
                    object.avatarUrl = "";
                }
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.Location.toObject(message.start, options);
                if (message.gunId != null && message.hasOwnProperty("gunId"))
                    object.gunId = message.gunId;
                if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                    object.avatarUrl = message.avatarUrl;
                return object;
            };

            /**
             * Converts this CreateTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateTripRequest;
        })();

        v1.GetTripRequest = (function() {

            /**
             * Properties of a GetTripRequest.
             * @memberof rental.v1
             * @interface IGetTripRequest
             * @property {string|null} [id] GetTripRequest id
             */

            /**
             * Constructs a new GetTripRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetTripRequest.
             * @implements IGetTripRequest
             * @constructor
             * @param {rental.v1.IGetTripRequest=} [properties] Properties to set
             */
            function GetTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripRequest id.
             * @member {string} id
             * @memberof rental.v1.GetTripRequest
             * @instance
             */
            GetTripRequest.prototype.id = "";

            /**
             * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripRequest} GetTripRequest
             */
            GetTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripRequest)
                    return object;
                let message = new $root.rental.v1.GetTripRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {rental.v1.GetTripRequest} message GetTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this GetTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripRequest;
        })();

        v1.GetTripListRequest = (function() {

            /**
             * Properties of a GetTripListRequest.
             * @memberof rental.v1
             * @interface IGetTripListRequest
             * @property {rental.v1.TripStatus|null} [status] GetTripListRequest status
             */

            /**
             * Constructs a new GetTripListRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetTripListRequest.
             * @implements IGetTripListRequest
             * @constructor
             * @param {rental.v1.IGetTripListRequest=} [properties] Properties to set
             */
            function GetTripListRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripListRequest status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.GetTripListRequest
             * @instance
             */
            GetTripListRequest.prototype.status = 0;

            /**
             * Creates a GetTripListRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripListRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripListRequest} GetTripListRequest
             */
            GetTripListRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripListRequest)
                    return object;
                let message = new $root.rental.v1.GetTripListRequest();
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripListRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripListRequest
             * @static
             * @param {rental.v1.GetTripListRequest} message GetTripListRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripListRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                return object;
            };

            /**
             * Converts this GetTripListRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripListRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripListRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripListRequest;
        })();

        v1.GetTripListResponse = (function() {

            /**
             * Properties of a GetTripListResponse.
             * @memberof rental.v1
             * @interface IGetTripListResponse
             * @property {Array.<rental.v1.ITripEntity>|null} [tripList] GetTripListResponse tripList
             */

            /**
             * Constructs a new GetTripListResponse.
             * @memberof rental.v1
             * @classdesc Represents a GetTripListResponse.
             * @implements IGetTripListResponse
             * @constructor
             * @param {rental.v1.IGetTripListResponse=} [properties] Properties to set
             */
            function GetTripListResponse(properties) {
                this.tripList = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripListResponse tripList.
             * @member {Array.<rental.v1.ITripEntity>} tripList
             * @memberof rental.v1.GetTripListResponse
             * @instance
             */
            GetTripListResponse.prototype.tripList = $util.emptyArray;

            /**
             * Creates a GetTripListResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripListResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripListResponse} GetTripListResponse
             */
            GetTripListResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripListResponse)
                    return object;
                let message = new $root.rental.v1.GetTripListResponse();
                if (object.tripList) {
                    if (!Array.isArray(object.tripList))
                        throw TypeError(".rental.v1.GetTripListResponse.tripList: array expected");
                    message.tripList = [];
                    for (let i = 0; i < object.tripList.length; ++i) {
                        if (typeof object.tripList[i] !== "object")
                            throw TypeError(".rental.v1.GetTripListResponse.tripList: object expected");
                        message.tripList[i] = $root.rental.v1.TripEntity.fromObject(object.tripList[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripListResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripListResponse
             * @static
             * @param {rental.v1.GetTripListResponse} message GetTripListResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripListResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.tripList = [];
                if (message.tripList && message.tripList.length) {
                    object.tripList = [];
                    for (let j = 0; j < message.tripList.length; ++j)
                        object.tripList[j] = $root.rental.v1.TripEntity.toObject(message.tripList[j], options);
                }
                return object;
            };

            /**
             * Converts this GetTripListResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripListResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripListResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripListResponse;
        })();

        v1.UpdateTripRequest = (function() {

            /**
             * Properties of an UpdateTripRequest.
             * @memberof rental.v1
             * @interface IUpdateTripRequest
             * @property {string|null} [id] UpdateTripRequest id
             * @property {rental.v1.ILocationStatus|null} [current] UpdateTripRequest current
             * @property {boolean|null} [endTrip] UpdateTripRequest endTrip
             */

            /**
             * Constructs a new UpdateTripRequest.
             * @memberof rental.v1
             * @classdesc Represents an UpdateTripRequest.
             * @implements IUpdateTripRequest
             * @constructor
             * @param {rental.v1.IUpdateTripRequest=} [properties] Properties to set
             */
            function UpdateTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateTripRequest id.
             * @member {string} id
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.id = "";

            /**
             * UpdateTripRequest current.
             * @member {rental.v1.ILocationStatus|null|undefined} current
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.current = null;

            /**
             * UpdateTripRequest endTrip.
             * @member {boolean} endTrip
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.endTrip = false;

            /**
             * Creates an UpdateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.UpdateTripRequest} UpdateTripRequest
             */
            UpdateTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.UpdateTripRequest)
                    return object;
                let message = new $root.rental.v1.UpdateTripRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.UpdateTripRequest.current: object expected");
                    message.current = $root.rental.v1.LocationStatus.fromObject(object.current);
                }
                if (object.endTrip != null)
                    message.endTrip = Boolean(object.endTrip);
                return message;
            };

            /**
             * Creates a plain object from an UpdateTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {rental.v1.UpdateTripRequest} message UpdateTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.current = null;
                    object.endTrip = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.LocationStatus.toObject(message.current, options);
                if (message.endTrip != null && message.hasOwnProperty("endTrip"))
                    object.endTrip = message.endTrip;
                return object;
            };

            /**
             * Converts this UpdateTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateTripRequest;
        })();

        v1.TripService = (function() {

            /**
             * Constructs a new TripService service.
             * @memberof rental.v1
             * @classdesc Represents a TripService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function TripService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (TripService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TripService;

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @memberof rental.v1.TripService
             * @typedef CreateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.TripEntity} [response] TripEntity
             */

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripRequest} request CreateTripRequest message or plain object
             * @param {rental.v1.TripService.CreateTripCallback} callback Node-style callback called with the error, if any, and TripEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.createTrip = function createTrip(request, callback) {
                return this.rpcCall(createTrip, $root.rental.v1.CreateTripRequest, $root.rental.v1.TripEntity, request, callback);
            }, "name", { value: "CreateTrip" });

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripRequest} request CreateTripRequest message or plain object
             * @returns {Promise<rental.v1.TripEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrip}.
             * @memberof rental.v1.TripService
             * @typedef GetTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripRequest} request GetTripRequest message or plain object
             * @param {rental.v1.TripService.GetTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrip = function getTrip(request, callback) {
                return this.rpcCall(getTrip, $root.rental.v1.GetTripRequest, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "GetTrip" });

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripRequest} request GetTripRequest message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTripList}.
             * @memberof rental.v1.TripService
             * @typedef GetTripListCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.GetTripListResponse} [response] GetTripListResponse
             */

            /**
             * Calls GetTripList.
             * @function getTripList
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripListRequest} request GetTripListRequest message or plain object
             * @param {rental.v1.TripService.GetTripListCallback} callback Node-style callback called with the error, if any, and GetTripListResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTripList = function getTripList(request, callback) {
                return this.rpcCall(getTripList, $root.rental.v1.GetTripListRequest, $root.rental.v1.GetTripListResponse, request, callback);
            }, "name", { value: "GetTripList" });

            /**
             * Calls GetTripList.
             * @function getTripList
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripListRequest} request GetTripListRequest message or plain object
             * @returns {Promise<rental.v1.GetTripListResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#updateTrip}.
             * @memberof rental.v1.TripService
             * @typedef UpdateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripRequest} request UpdateTripRequest message or plain object
             * @param {rental.v1.TripService.UpdateTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.updateTrip = function updateTrip(request, callback) {
                return this.rpcCall(updateTrip, $root.rental.v1.UpdateTripRequest, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "UpdateTrip" });

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripRequest} request UpdateTripRequest message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            return TripService;
        })();

        /**
         * Gender enum.
         * @name rental.v1.Gender
         * @enum {number}
         * @property {number} G_NOT_SPECIFIED=0 G_NOT_SPECIFIED value
         * @property {number} MALE=1 MALE value
         * @property {number} FEMALE=2 FEMALE value
         */
        v1.Gender = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "G_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "MALE"] = 1;
            values[valuesById[2] = "FEMALE"] = 2;
            return values;
        })();

        v1.Identity = (function() {

            /**
             * Properties of an Identity.
             * @memberof rental.v1
             * @interface IIdentity
             * @property {string|null} [licNumber] Identity licNumber
             * @property {string|null} [name] Identity name
             * @property {rental.v1.Gender|null} [gender] Identity gender
             * @property {number|null} [birthDataMillis] Identity birthDataMillis
             */

            /**
             * Constructs a new Identity.
             * @memberof rental.v1
             * @classdesc Represents an Identity.
             * @implements IIdentity
             * @constructor
             * @param {rental.v1.IIdentity=} [properties] Properties to set
             */
            function Identity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Identity licNumber.
             * @member {string} licNumber
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.licNumber = "";

            /**
             * Identity name.
             * @member {string} name
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.name = "";

            /**
             * Identity gender.
             * @member {rental.v1.Gender} gender
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.gender = 0;

            /**
             * Identity birthDataMillis.
             * @member {number} birthDataMillis
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.birthDataMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates an Identity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Identity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Identity} Identity
             */
            Identity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Identity)
                    return object;
                let message = new $root.rental.v1.Identity();
                if (object.licNumber != null)
                    message.licNumber = String(object.licNumber);
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.gender) {
                case "G_NOT_SPECIFIED":
                case 0:
                    message.gender = 0;
                    break;
                case "MALE":
                case 1:
                    message.gender = 1;
                    break;
                case "FEMALE":
                case 2:
                    message.gender = 2;
                    break;
                }
                if (object.birthDataMillis != null)
                    if ($util.Long)
                        (message.birthDataMillis = $util.Long.fromValue(object.birthDataMillis)).unsigned = false;
                    else if (typeof object.birthDataMillis === "string")
                        message.birthDataMillis = parseInt(object.birthDataMillis, 10);
                    else if (typeof object.birthDataMillis === "number")
                        message.birthDataMillis = object.birthDataMillis;
                    else if (typeof object.birthDataMillis === "object")
                        message.birthDataMillis = new $util.LongBits(object.birthDataMillis.low >>> 0, object.birthDataMillis.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Identity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Identity
             * @static
             * @param {rental.v1.Identity} message Identity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Identity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.licNumber = "";
                    object.name = "";
                    object.gender = options.enums === String ? "G_NOT_SPECIFIED" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.birthDataMillis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.birthDataMillis = options.longs === String ? "0" : 0;
                }
                if (message.licNumber != null && message.hasOwnProperty("licNumber"))
                    object.licNumber = message.licNumber;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.gender != null && message.hasOwnProperty("gender"))
                    object.gender = options.enums === String ? $root.rental.v1.Gender[message.gender] : message.gender;
                if (message.birthDataMillis != null && message.hasOwnProperty("birthDataMillis"))
                    if (typeof message.birthDataMillis === "number")
                        object.birthDataMillis = options.longs === String ? String(message.birthDataMillis) : message.birthDataMillis;
                    else
                        object.birthDataMillis = options.longs === String ? $util.Long.prototype.toString.call(message.birthDataMillis) : options.longs === Number ? new $util.LongBits(message.birthDataMillis.low >>> 0, message.birthDataMillis.high >>> 0).toNumber() : message.birthDataMillis;
                return object;
            };

            /**
             * Converts this Identity to JSON.
             * @function toJSON
             * @memberof rental.v1.Identity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Identity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Identity;
        })();

        /**
         * IdentityStatus enum.
         * @name rental.v1.IdentityStatus
         * @enum {number}
         * @property {number} UN_SUBMITTED=0 UN_SUBMITTED value
         * @property {number} PENDING=1 PENDING value
         * @property {number} VERIFIED=2 VERIFIED value
         */
        v1.IdentityStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UN_SUBMITTED"] = 0;
            values[valuesById[1] = "PENDING"] = 1;
            values[valuesById[2] = "VERIFIED"] = 2;
            return values;
        })();

        v1.Profile = (function() {

            /**
             * Properties of a Profile.
             * @memberof rental.v1
             * @interface IProfile
             * @property {rental.v1.IIdentity|null} [identity] Profile identity
             * @property {rental.v1.IdentityStatus|null} [identityStatus] Profile identityStatus
             */

            /**
             * Constructs a new Profile.
             * @memberof rental.v1
             * @classdesc Represents a Profile.
             * @implements IProfile
             * @constructor
             * @param {rental.v1.IProfile=} [properties] Properties to set
             */
            function Profile(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Profile identity.
             * @member {rental.v1.IIdentity|null|undefined} identity
             * @memberof rental.v1.Profile
             * @instance
             */
            Profile.prototype.identity = null;

            /**
             * Profile identityStatus.
             * @member {rental.v1.IdentityStatus} identityStatus
             * @memberof rental.v1.Profile
             * @instance
             */
            Profile.prototype.identityStatus = 0;

            /**
             * Creates a Profile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Profile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Profile} Profile
             */
            Profile.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Profile)
                    return object;
                let message = new $root.rental.v1.Profile();
                if (object.identity != null) {
                    if (typeof object.identity !== "object")
                        throw TypeError(".rental.v1.Profile.identity: object expected");
                    message.identity = $root.rental.v1.Identity.fromObject(object.identity);
                }
                switch (object.identityStatus) {
                case "UN_SUBMITTED":
                case 0:
                    message.identityStatus = 0;
                    break;
                case "PENDING":
                case 1:
                    message.identityStatus = 1;
                    break;
                case "VERIFIED":
                case 2:
                    message.identityStatus = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a Profile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Profile
             * @static
             * @param {rental.v1.Profile} message Profile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Profile.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.identity = null;
                    object.identityStatus = options.enums === String ? "UN_SUBMITTED" : 0;
                }
                if (message.identity != null && message.hasOwnProperty("identity"))
                    object.identity = $root.rental.v1.Identity.toObject(message.identity, options);
                if (message.identityStatus != null && message.hasOwnProperty("identityStatus"))
                    object.identityStatus = options.enums === String ? $root.rental.v1.IdentityStatus[message.identityStatus] : message.identityStatus;
                return object;
            };

            /**
             * Converts this Profile to JSON.
             * @function toJSON
             * @memberof rental.v1.Profile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Profile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Profile;
        })();

        v1.GetProfileRequest = (function() {

            /**
             * Properties of a GetProfileRequest.
             * @memberof rental.v1
             * @interface IGetProfileRequest
             */

            /**
             * Constructs a new GetProfileRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetProfileRequest.
             * @implements IGetProfileRequest
             * @constructor
             * @param {rental.v1.IGetProfileRequest=} [properties] Properties to set
             */
            function GetProfileRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a GetProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfileRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfileRequest} GetProfileRequest
             */
            GetProfileRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfileRequest)
                    return object;
                return new $root.rental.v1.GetProfileRequest();
            };

            /**
             * Creates a plain object from a GetProfileRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfileRequest
             * @static
             * @param {rental.v1.GetProfileRequest} message GetProfileRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfileRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetProfileRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfileRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfileRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfileRequest;
        })();

        v1.ClearProfileRequest = (function() {

            /**
             * Properties of a ClearProfileRequest.
             * @memberof rental.v1
             * @interface IClearProfileRequest
             */

            /**
             * Constructs a new ClearProfileRequest.
             * @memberof rental.v1
             * @classdesc Represents a ClearProfileRequest.
             * @implements IClearProfileRequest
             * @constructor
             * @param {rental.v1.IClearProfileRequest=} [properties] Properties to set
             */
            function ClearProfileRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a ClearProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.ClearProfileRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.ClearProfileRequest} ClearProfileRequest
             */
            ClearProfileRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.ClearProfileRequest)
                    return object;
                return new $root.rental.v1.ClearProfileRequest();
            };

            /**
             * Creates a plain object from a ClearProfileRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.ClearProfileRequest
             * @static
             * @param {rental.v1.ClearProfileRequest} message ClearProfileRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClearProfileRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClearProfileRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.ClearProfileRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClearProfileRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClearProfileRequest;
        })();

        v1.GetProfilePhotoRequest = (function() {

            /**
             * Properties of a GetProfilePhotoRequest.
             * @memberof rental.v1
             * @interface IGetProfilePhotoRequest
             */

            /**
             * Constructs a new GetProfilePhotoRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetProfilePhotoRequest.
             * @implements IGetProfilePhotoRequest
             * @constructor
             * @param {rental.v1.IGetProfilePhotoRequest=} [properties] Properties to set
             */
            function GetProfilePhotoRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a GetProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfilePhotoRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfilePhotoRequest} GetProfilePhotoRequest
             */
            GetProfilePhotoRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfilePhotoRequest)
                    return object;
                return new $root.rental.v1.GetProfilePhotoRequest();
            };

            /**
             * Creates a plain object from a GetProfilePhotoRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfilePhotoRequest
             * @static
             * @param {rental.v1.GetProfilePhotoRequest} message GetProfilePhotoRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfilePhotoRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetProfilePhotoRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfilePhotoRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfilePhotoRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfilePhotoRequest;
        })();

        v1.GetProfilePhotoResponse = (function() {

            /**
             * Properties of a GetProfilePhotoResponse.
             * @memberof rental.v1
             * @interface IGetProfilePhotoResponse
             * @property {string|null} [url] GetProfilePhotoResponse url
             */

            /**
             * Constructs a new GetProfilePhotoResponse.
             * @memberof rental.v1
             * @classdesc Represents a GetProfilePhotoResponse.
             * @implements IGetProfilePhotoResponse
             * @constructor
             * @param {rental.v1.IGetProfilePhotoResponse=} [properties] Properties to set
             */
            function GetProfilePhotoResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetProfilePhotoResponse url.
             * @member {string} url
             * @memberof rental.v1.GetProfilePhotoResponse
             * @instance
             */
            GetProfilePhotoResponse.prototype.url = "";

            /**
             * Creates a GetProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfilePhotoResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfilePhotoResponse} GetProfilePhotoResponse
             */
            GetProfilePhotoResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfilePhotoResponse)
                    return object;
                let message = new $root.rental.v1.GetProfilePhotoResponse();
                if (object.url != null)
                    message.url = String(object.url);
                return message;
            };

            /**
             * Creates a plain object from a GetProfilePhotoResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfilePhotoResponse
             * @static
             * @param {rental.v1.GetProfilePhotoResponse} message GetProfilePhotoResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfilePhotoResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.url = "";
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                return object;
            };

            /**
             * Converts this GetProfilePhotoResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfilePhotoResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfilePhotoResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfilePhotoResponse;
        })();

        v1.CreateProfileRequest = (function() {

            /**
             * Properties of a CreateProfileRequest.
             * @memberof rental.v1
             * @interface ICreateProfileRequest
             */

            /**
             * Constructs a new CreateProfileRequest.
             * @memberof rental.v1
             * @classdesc Represents a CreateProfileRequest.
             * @implements ICreateProfileRequest
             * @constructor
             * @param {rental.v1.ICreateProfileRequest=} [properties] Properties to set
             */
            function CreateProfileRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a CreateProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateProfileRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateProfileRequest} CreateProfileRequest
             */
            CreateProfileRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateProfileRequest)
                    return object;
                return new $root.rental.v1.CreateProfileRequest();
            };

            /**
             * Creates a plain object from a CreateProfileRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateProfileRequest
             * @static
             * @param {rental.v1.CreateProfileRequest} message CreateProfileRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateProfileRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this CreateProfileRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateProfileRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateProfileRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateProfileRequest;
        })();

        v1.CreateProfilePhotoResponse = (function() {

            /**
             * Properties of a CreateProfilePhotoResponse.
             * @memberof rental.v1
             * @interface ICreateProfilePhotoResponse
             * @property {string|null} [uploadUrl] CreateProfilePhotoResponse uploadUrl
             */

            /**
             * Constructs a new CreateProfilePhotoResponse.
             * @memberof rental.v1
             * @classdesc Represents a CreateProfilePhotoResponse.
             * @implements ICreateProfilePhotoResponse
             * @constructor
             * @param {rental.v1.ICreateProfilePhotoResponse=} [properties] Properties to set
             */
            function CreateProfilePhotoResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateProfilePhotoResponse uploadUrl.
             * @member {string} uploadUrl
             * @memberof rental.v1.CreateProfilePhotoResponse
             * @instance
             */
            CreateProfilePhotoResponse.prototype.uploadUrl = "";

            /**
             * Creates a CreateProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateProfilePhotoResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateProfilePhotoResponse} CreateProfilePhotoResponse
             */
            CreateProfilePhotoResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateProfilePhotoResponse)
                    return object;
                let message = new $root.rental.v1.CreateProfilePhotoResponse();
                if (object.uploadUrl != null)
                    message.uploadUrl = String(object.uploadUrl);
                return message;
            };

            /**
             * Creates a plain object from a CreateProfilePhotoResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateProfilePhotoResponse
             * @static
             * @param {rental.v1.CreateProfilePhotoResponse} message CreateProfilePhotoResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateProfilePhotoResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.uploadUrl = "";
                if (message.uploadUrl != null && message.hasOwnProperty("uploadUrl"))
                    object.uploadUrl = message.uploadUrl;
                return object;
            };

            /**
             * Converts this CreateProfilePhotoResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateProfilePhotoResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateProfilePhotoResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateProfilePhotoResponse;
        })();

        v1.CompleteProfileRequest = (function() {

            /**
             * Properties of a CompleteProfileRequest.
             * @memberof rental.v1
             * @interface ICompleteProfileRequest
             */

            /**
             * Constructs a new CompleteProfileRequest.
             * @memberof rental.v1
             * @classdesc Represents a CompleteProfileRequest.
             * @implements ICompleteProfileRequest
             * @constructor
             * @param {rental.v1.ICompleteProfileRequest=} [properties] Properties to set
             */
            function CompleteProfileRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a CompleteProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CompleteProfileRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CompleteProfileRequest} CompleteProfileRequest
             */
            CompleteProfileRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CompleteProfileRequest)
                    return object;
                return new $root.rental.v1.CompleteProfileRequest();
            };

            /**
             * Creates a plain object from a CompleteProfileRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CompleteProfileRequest
             * @static
             * @param {rental.v1.CompleteProfileRequest} message CompleteProfileRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CompleteProfileRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this CompleteProfileRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.CompleteProfileRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CompleteProfileRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CompleteProfileRequest;
        })();

        v1.ClearProfilePhotoRequest = (function() {

            /**
             * Properties of a ClearProfilePhotoRequest.
             * @memberof rental.v1
             * @interface IClearProfilePhotoRequest
             */

            /**
             * Constructs a new ClearProfilePhotoRequest.
             * @memberof rental.v1
             * @classdesc Represents a ClearProfilePhotoRequest.
             * @implements IClearProfilePhotoRequest
             * @constructor
             * @param {rental.v1.IClearProfilePhotoRequest=} [properties] Properties to set
             */
            function ClearProfilePhotoRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a ClearProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.ClearProfilePhotoRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.ClearProfilePhotoRequest} ClearProfilePhotoRequest
             */
            ClearProfilePhotoRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.ClearProfilePhotoRequest)
                    return object;
                return new $root.rental.v1.ClearProfilePhotoRequest();
            };

            /**
             * Creates a plain object from a ClearProfilePhotoRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.ClearProfilePhotoRequest
             * @static
             * @param {rental.v1.ClearProfilePhotoRequest} message ClearProfilePhotoRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClearProfilePhotoRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClearProfilePhotoRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.ClearProfilePhotoRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClearProfilePhotoRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClearProfilePhotoRequest;
        })();

        v1.ClearProfilePhotoResponse = (function() {

            /**
             * Properties of a ClearProfilePhotoResponse.
             * @memberof rental.v1
             * @interface IClearProfilePhotoResponse
             */

            /**
             * Constructs a new ClearProfilePhotoResponse.
             * @memberof rental.v1
             * @classdesc Represents a ClearProfilePhotoResponse.
             * @implements IClearProfilePhotoResponse
             * @constructor
             * @param {rental.v1.IClearProfilePhotoResponse=} [properties] Properties to set
             */
            function ClearProfilePhotoResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a ClearProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.ClearProfilePhotoResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.ClearProfilePhotoResponse} ClearProfilePhotoResponse
             */
            ClearProfilePhotoResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.ClearProfilePhotoResponse)
                    return object;
                return new $root.rental.v1.ClearProfilePhotoResponse();
            };

            /**
             * Creates a plain object from a ClearProfilePhotoResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.ClearProfilePhotoResponse
             * @static
             * @param {rental.v1.ClearProfilePhotoResponse} message ClearProfilePhotoResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClearProfilePhotoResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClearProfilePhotoResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.ClearProfilePhotoResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClearProfilePhotoResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClearProfilePhotoResponse;
        })();

        v1.ProfileService = (function() {

            /**
             * Constructs a new ProfileService service.
             * @memberof rental.v1
             * @classdesc Represents a ProfileService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function ProfileService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (ProfileService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ProfileService;

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef GetProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls GetProfile.
             * @function getProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfileRequest} request GetProfileRequest message or plain object
             * @param {rental.v1.ProfileService.GetProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.getProfile = function getProfile(request, callback) {
                return this.rpcCall(getProfile, $root.rental.v1.GetProfileRequest, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "GetProfile" });

            /**
             * Calls GetProfile.
             * @function getProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfileRequest} request GetProfileRequest message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#submitProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef SubmitProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls SubmitProfile.
             * @function submitProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IIdentity} request Identity message or plain object
             * @param {rental.v1.ProfileService.SubmitProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.submitProfile = function submitProfile(request, callback) {
                return this.rpcCall(submitProfile, $root.rental.v1.Identity, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "SubmitProfile" });

            /**
             * Calls SubmitProfile.
             * @function submitProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IIdentity} request Identity message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef ClearProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls ClearProfile.
             * @function clearProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfileRequest} request ClearProfileRequest message or plain object
             * @param {rental.v1.ProfileService.ClearProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.clearProfile = function clearProfile(request, callback) {
                return this.rpcCall(clearProfile, $root.rental.v1.ClearProfileRequest, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "ClearProfile" });

            /**
             * Calls ClearProfile.
             * @function clearProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfileRequest} request ClearProfileRequest message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef GetProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.GetProfilePhotoResponse} [response] GetProfilePhotoResponse
             */

            /**
             * Calls GetProfilePhoto.
             * @function getProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfilePhotoRequest} request GetProfilePhotoRequest message or plain object
             * @param {rental.v1.ProfileService.GetProfilePhotoCallback} callback Node-style callback called with the error, if any, and GetProfilePhotoResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.getProfilePhoto = function getProfilePhoto(request, callback) {
                return this.rpcCall(getProfilePhoto, $root.rental.v1.GetProfilePhotoRequest, $root.rental.v1.GetProfilePhotoResponse, request, callback);
            }, "name", { value: "GetProfilePhoto" });

            /**
             * Calls GetProfilePhoto.
             * @function getProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfilePhotoRequest} request GetProfilePhotoRequest message or plain object
             * @returns {Promise<rental.v1.GetProfilePhotoResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#createProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef CreateProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.CreateProfilePhotoResponse} [response] CreateProfilePhotoResponse
             */

            /**
             * Calls CreateProfilePhoto.
             * @function createProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICreateProfileRequest} request CreateProfileRequest message or plain object
             * @param {rental.v1.ProfileService.CreateProfilePhotoCallback} callback Node-style callback called with the error, if any, and CreateProfilePhotoResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.createProfilePhoto = function createProfilePhoto(request, callback) {
                return this.rpcCall(createProfilePhoto, $root.rental.v1.CreateProfileRequest, $root.rental.v1.CreateProfilePhotoResponse, request, callback);
            }, "name", { value: "CreateProfilePhoto" });

            /**
             * Calls CreateProfilePhoto.
             * @function createProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICreateProfileRequest} request CreateProfileRequest message or plain object
             * @returns {Promise<rental.v1.CreateProfilePhotoResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#completeProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef CompleteProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Identity} [response] Identity
             */

            /**
             * Calls CompleteProfilePhoto.
             * @function completeProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICompleteProfileRequest} request CompleteProfileRequest message or plain object
             * @param {rental.v1.ProfileService.CompleteProfilePhotoCallback} callback Node-style callback called with the error, if any, and Identity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.completeProfilePhoto = function completeProfilePhoto(request, callback) {
                return this.rpcCall(completeProfilePhoto, $root.rental.v1.CompleteProfileRequest, $root.rental.v1.Identity, request, callback);
            }, "name", { value: "CompleteProfilePhoto" });

            /**
             * Calls CompleteProfilePhoto.
             * @function completeProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICompleteProfileRequest} request CompleteProfileRequest message or plain object
             * @returns {Promise<rental.v1.Identity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef ClearProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.ClearProfilePhotoResponse} [response] ClearProfilePhotoResponse
             */

            /**
             * Calls ClearProfilePhoto.
             * @function clearProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfilePhotoRequest} request ClearProfilePhotoRequest message or plain object
             * @param {rental.v1.ProfileService.ClearProfilePhotoCallback} callback Node-style callback called with the error, if any, and ClearProfilePhotoResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.clearProfilePhoto = function clearProfilePhoto(request, callback) {
                return this.rpcCall(clearProfilePhoto, $root.rental.v1.ClearProfilePhotoRequest, $root.rental.v1.ClearProfilePhotoResponse, request, callback);
            }, "name", { value: "ClearProfilePhoto" });

            /**
             * Calls ClearProfilePhoto.
             * @function clearProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfilePhotoRequest} request ClearProfilePhotoRequest message or plain object
             * @returns {Promise<rental.v1.ClearProfilePhotoResponse>} Promise
             * @variation 2
             */

            return ProfileService;
        })();

        return v1;
    })();

    return rental;
})();