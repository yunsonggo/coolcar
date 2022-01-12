import * as $protobuf from "protobufjs";
// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const gun = $root.gun = (() => {

    /**
     * Namespace gun.
     * @exports gun
     * @namespace
     */
    const gun = {};

    gun.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof gun
         * @namespace
         */
        const v1 = {};

        v1.GunEntity = (function() {

            /**
             * Properties of a GunEntity.
             * @memberof gun.v1
             * @interface IGunEntity
             * @property {string|null} [id] GunEntity id
             * @property {gun.v1.IGun|null} [gun] GunEntity gun
             */

            /**
             * Constructs a new GunEntity.
             * @memberof gun.v1
             * @classdesc Represents a GunEntity.
             * @implements IGunEntity
             * @constructor
             * @param {gun.v1.IGunEntity=} [properties] Properties to set
             */
            function GunEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GunEntity id.
             * @member {string} id
             * @memberof gun.v1.GunEntity
             * @instance
             */
            GunEntity.prototype.id = "";

            /**
             * GunEntity gun.
             * @member {gun.v1.IGun|null|undefined} gun
             * @memberof gun.v1.GunEntity
             * @instance
             */
            GunEntity.prototype.gun = null;

            /**
             * Creates a GunEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.GunEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.GunEntity} GunEntity
             */
            GunEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.GunEntity)
                    return object;
                let message = new $root.gun.v1.GunEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.gun != null) {
                    if (typeof object.gun !== "object")
                        throw TypeError(".gun.v1.GunEntity.gun: object expected");
                    message.gun = $root.gun.v1.Gun.fromObject(object.gun);
                }
                return message;
            };

            /**
             * Creates a plain object from a GunEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.GunEntity
             * @static
             * @param {gun.v1.GunEntity} message GunEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GunEntity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.gun = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.gun != null && message.hasOwnProperty("gun"))
                    object.gun = $root.gun.v1.Gun.toObject(message.gun, options);
                return object;
            };

            /**
             * Converts this GunEntity to JSON.
             * @function toJSON
             * @memberof gun.v1.GunEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GunEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GunEntity;
        })();

        /**
         * GunStatus enum.
         * @name gun.v1.GunStatus
         * @enum {number}
         * @property {number} GS_NO_SPECIFIED=0 GS_NO_SPECIFIED value
         * @property {number} LOCKED=1 LOCKED value
         * @property {number} UNLOCKING=2 UNLOCKING value
         * @property {number} UNLOCKED=3 UNLOCKED value
         * @property {number} LOCKING=4 LOCKING value
         */
        v1.GunStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "GS_NO_SPECIFIED"] = 0;
            values[valuesById[1] = "LOCKED"] = 1;
            values[valuesById[2] = "UNLOCKING"] = 2;
            values[valuesById[3] = "UNLOCKED"] = 3;
            values[valuesById[4] = "LOCKING"] = 4;
            return values;
        })();

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof gun.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof gun.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {gun.v1.ILocation=} [properties] Properties to set
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
             * @memberof gun.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof gun.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.Location)
                    return object;
                let message = new $root.gun.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.Location
             * @static
             * @param {gun.v1.Location} message Location
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
             * @memberof gun.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.Driver = (function() {

            /**
             * Properties of a Driver.
             * @memberof gun.v1
             * @interface IDriver
             * @property {string|null} [id] Driver id
             * @property {string|null} [avatarUrl] Driver avatarUrl
             */

            /**
             * Constructs a new Driver.
             * @memberof gun.v1
             * @classdesc Represents a Driver.
             * @implements IDriver
             * @constructor
             * @param {gun.v1.IDriver=} [properties] Properties to set
             */
            function Driver(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Driver id.
             * @member {string} id
             * @memberof gun.v1.Driver
             * @instance
             */
            Driver.prototype.id = "";

            /**
             * Driver avatarUrl.
             * @member {string} avatarUrl
             * @memberof gun.v1.Driver
             * @instance
             */
            Driver.prototype.avatarUrl = "";

            /**
             * Creates a Driver message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.Driver
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.Driver} Driver
             */
            Driver.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.Driver)
                    return object;
                let message = new $root.gun.v1.Driver();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.avatarUrl != null)
                    message.avatarUrl = String(object.avatarUrl);
                return message;
            };

            /**
             * Creates a plain object from a Driver message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.Driver
             * @static
             * @param {gun.v1.Driver} message Driver
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Driver.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.avatarUrl = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                    object.avatarUrl = message.avatarUrl;
                return object;
            };

            /**
             * Converts this Driver to JSON.
             * @function toJSON
             * @memberof gun.v1.Driver
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Driver.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Driver;
        })();

        v1.Gun = (function() {

            /**
             * Properties of a Gun.
             * @memberof gun.v1
             * @interface IGun
             * @property {gun.v1.GunStatus|null} [status] Gun status
             * @property {gun.v1.IDriver|null} [driver] Gun driver
             * @property {gun.v1.ILocation|null} [position] Gun position
             * @property {string|null} [tripId] Gun tripId
             * @property {string|null} [type] Gun type
             * @property {string|null} ["class"] Gun class
             * @property {string|null} [cardid] Gun cardid
             */

            /**
             * Constructs a new Gun.
             * @memberof gun.v1
             * @classdesc Represents a Gun.
             * @implements IGun
             * @constructor
             * @param {gun.v1.IGun=} [properties] Properties to set
             */
            function Gun(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Gun status.
             * @member {gun.v1.GunStatus} status
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype.status = 0;

            /**
             * Gun driver.
             * @member {gun.v1.IDriver|null|undefined} driver
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype.driver = null;

            /**
             * Gun position.
             * @member {gun.v1.ILocation|null|undefined} position
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype.position = null;

            /**
             * Gun tripId.
             * @member {string} tripId
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype.tripId = "";

            /**
             * Gun type.
             * @member {string} type
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype.type = "";

            /**
             * Gun class.
             * @member {string} class
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype["class"] = "";

            /**
             * Gun cardid.
             * @member {string} cardid
             * @memberof gun.v1.Gun
             * @instance
             */
            Gun.prototype.cardid = "";

            /**
             * Creates a Gun message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.Gun
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.Gun} Gun
             */
            Gun.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.Gun)
                    return object;
                let message = new $root.gun.v1.Gun();
                switch (object.status) {
                case "GS_NO_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "LOCKED":
                case 1:
                    message.status = 1;
                    break;
                case "UNLOCKING":
                case 2:
                    message.status = 2;
                    break;
                case "UNLOCKED":
                case 3:
                    message.status = 3;
                    break;
                case "LOCKING":
                case 4:
                    message.status = 4;
                    break;
                }
                if (object.driver != null) {
                    if (typeof object.driver !== "object")
                        throw TypeError(".gun.v1.Gun.driver: object expected");
                    message.driver = $root.gun.v1.Driver.fromObject(object.driver);
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".gun.v1.Gun.position: object expected");
                    message.position = $root.gun.v1.Location.fromObject(object.position);
                }
                if (object.tripId != null)
                    message.tripId = String(object.tripId);
                if (object.type != null)
                    message.type = String(object.type);
                if (object["class"] != null)
                    message["class"] = String(object["class"]);
                if (object.cardid != null)
                    message.cardid = String(object.cardid);
                return message;
            };

            /**
             * Creates a plain object from a Gun message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.Gun
             * @static
             * @param {gun.v1.Gun} message Gun
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Gun.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.status = options.enums === String ? "GS_NO_SPECIFIED" : 0;
                    object.driver = null;
                    object.position = null;
                    object.tripId = "";
                    object.type = "";
                    object["class"] = "";
                    object.cardid = "";
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.gun.v1.GunStatus[message.status] : message.status;
                if (message.driver != null && message.hasOwnProperty("driver"))
                    object.driver = $root.gun.v1.Driver.toObject(message.driver, options);
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.gun.v1.Location.toObject(message.position, options);
                if (message.tripId != null && message.hasOwnProperty("tripId"))
                    object.tripId = message.tripId;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message["class"] != null && message.hasOwnProperty("class"))
                    object["class"] = message["class"];
                if (message.cardid != null && message.hasOwnProperty("cardid"))
                    object.cardid = message.cardid;
                return object;
            };

            /**
             * Converts this Gun to JSON.
             * @function toJSON
             * @memberof gun.v1.Gun
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Gun.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Gun;
        })();

        v1.CreateGunRequest = (function() {

            /**
             * Properties of a CreateGunRequest.
             * @memberof gun.v1
             * @interface ICreateGunRequest
             * @property {string|null} [type] CreateGunRequest type
             * @property {string|null} ["class"] CreateGunRequest class
             * @property {string|null} [cardId] CreateGunRequest cardId
             * @property {gun.v1.ILocation|null} [position] CreateGunRequest position
             */

            /**
             * Constructs a new CreateGunRequest.
             * @memberof gun.v1
             * @classdesc Represents a CreateGunRequest.
             * @implements ICreateGunRequest
             * @constructor
             * @param {gun.v1.ICreateGunRequest=} [properties] Properties to set
             */
            function CreateGunRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateGunRequest type.
             * @member {string} type
             * @memberof gun.v1.CreateGunRequest
             * @instance
             */
            CreateGunRequest.prototype.type = "";

            /**
             * CreateGunRequest class.
             * @member {string} class
             * @memberof gun.v1.CreateGunRequest
             * @instance
             */
            CreateGunRequest.prototype["class"] = "";

            /**
             * CreateGunRequest cardId.
             * @member {string} cardId
             * @memberof gun.v1.CreateGunRequest
             * @instance
             */
            CreateGunRequest.prototype.cardId = "";

            /**
             * CreateGunRequest position.
             * @member {gun.v1.ILocation|null|undefined} position
             * @memberof gun.v1.CreateGunRequest
             * @instance
             */
            CreateGunRequest.prototype.position = null;

            /**
             * Creates a CreateGunRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.CreateGunRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.CreateGunRequest} CreateGunRequest
             */
            CreateGunRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.CreateGunRequest)
                    return object;
                let message = new $root.gun.v1.CreateGunRequest();
                if (object.type != null)
                    message.type = String(object.type);
                if (object["class"] != null)
                    message["class"] = String(object["class"]);
                if (object.cardId != null)
                    message.cardId = String(object.cardId);
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".gun.v1.CreateGunRequest.position: object expected");
                    message.position = $root.gun.v1.Location.fromObject(object.position);
                }
                return message;
            };

            /**
             * Creates a plain object from a CreateGunRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.CreateGunRequest
             * @static
             * @param {gun.v1.CreateGunRequest} message CreateGunRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateGunRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type = "";
                    object["class"] = "";
                    object.cardId = "";
                    object.position = null;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message["class"] != null && message.hasOwnProperty("class"))
                    object["class"] = message["class"];
                if (message.cardId != null && message.hasOwnProperty("cardId"))
                    object.cardId = message.cardId;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.gun.v1.Location.toObject(message.position, options);
                return object;
            };

            /**
             * Converts this CreateGunRequest to JSON.
             * @function toJSON
             * @memberof gun.v1.CreateGunRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateGunRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateGunRequest;
        })();

        v1.GetGunRequest = (function() {

            /**
             * Properties of a GetGunRequest.
             * @memberof gun.v1
             * @interface IGetGunRequest
             * @property {string|null} [id] GetGunRequest id
             */

            /**
             * Constructs a new GetGunRequest.
             * @memberof gun.v1
             * @classdesc Represents a GetGunRequest.
             * @implements IGetGunRequest
             * @constructor
             * @param {gun.v1.IGetGunRequest=} [properties] Properties to set
             */
            function GetGunRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetGunRequest id.
             * @member {string} id
             * @memberof gun.v1.GetGunRequest
             * @instance
             */
            GetGunRequest.prototype.id = "";

            /**
             * Creates a GetGunRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.GetGunRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.GetGunRequest} GetGunRequest
             */
            GetGunRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.GetGunRequest)
                    return object;
                let message = new $root.gun.v1.GetGunRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetGunRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.GetGunRequest
             * @static
             * @param {gun.v1.GetGunRequest} message GetGunRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetGunRequest.toObject = function toObject(message, options) {
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
             * Converts this GetGunRequest to JSON.
             * @function toJSON
             * @memberof gun.v1.GetGunRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetGunRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetGunRequest;
        })();

        v1.GetGunListRequest = (function() {

            /**
             * Properties of a GetGunListRequest.
             * @memberof gun.v1
             * @interface IGetGunListRequest
             * @property {gun.v1.GunStatus|null} [status] GetGunListRequest status
             */

            /**
             * Constructs a new GetGunListRequest.
             * @memberof gun.v1
             * @classdesc Represents a GetGunListRequest.
             * @implements IGetGunListRequest
             * @constructor
             * @param {gun.v1.IGetGunListRequest=} [properties] Properties to set
             */
            function GetGunListRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetGunListRequest status.
             * @member {gun.v1.GunStatus} status
             * @memberof gun.v1.GetGunListRequest
             * @instance
             */
            GetGunListRequest.prototype.status = 0;

            /**
             * Creates a GetGunListRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.GetGunListRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.GetGunListRequest} GetGunListRequest
             */
            GetGunListRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.GetGunListRequest)
                    return object;
                let message = new $root.gun.v1.GetGunListRequest();
                switch (object.status) {
                case "GS_NO_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "LOCKED":
                case 1:
                    message.status = 1;
                    break;
                case "UNLOCKING":
                case 2:
                    message.status = 2;
                    break;
                case "UNLOCKED":
                case 3:
                    message.status = 3;
                    break;
                case "LOCKING":
                case 4:
                    message.status = 4;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a GetGunListRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.GetGunListRequest
             * @static
             * @param {gun.v1.GetGunListRequest} message GetGunListRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetGunListRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.status = options.enums === String ? "GS_NO_SPECIFIED" : 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.gun.v1.GunStatus[message.status] : message.status;
                return object;
            };

            /**
             * Converts this GetGunListRequest to JSON.
             * @function toJSON
             * @memberof gun.v1.GetGunListRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetGunListRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetGunListRequest;
        })();

        v1.GetGunListResponse = (function() {

            /**
             * Properties of a GetGunListResponse.
             * @memberof gun.v1
             * @interface IGetGunListResponse
             * @property {Array.<gun.v1.IGunEntity>|null} [GunList] GetGunListResponse GunList
             */

            /**
             * Constructs a new GetGunListResponse.
             * @memberof gun.v1
             * @classdesc Represents a GetGunListResponse.
             * @implements IGetGunListResponse
             * @constructor
             * @param {gun.v1.IGetGunListResponse=} [properties] Properties to set
             */
            function GetGunListResponse(properties) {
                this.GunList = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetGunListResponse GunList.
             * @member {Array.<gun.v1.IGunEntity>} GunList
             * @memberof gun.v1.GetGunListResponse
             * @instance
             */
            GetGunListResponse.prototype.GunList = $util.emptyArray;

            /**
             * Creates a GetGunListResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.GetGunListResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.GetGunListResponse} GetGunListResponse
             */
            GetGunListResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.GetGunListResponse)
                    return object;
                let message = new $root.gun.v1.GetGunListResponse();
                if (object.GunList) {
                    if (!Array.isArray(object.GunList))
                        throw TypeError(".gun.v1.GetGunListResponse.GunList: array expected");
                    message.GunList = [];
                    for (let i = 0; i < object.GunList.length; ++i) {
                        if (typeof object.GunList[i] !== "object")
                            throw TypeError(".gun.v1.GetGunListResponse.GunList: object expected");
                        message.GunList[i] = $root.gun.v1.GunEntity.fromObject(object.GunList[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetGunListResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.GetGunListResponse
             * @static
             * @param {gun.v1.GetGunListResponse} message GetGunListResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetGunListResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.GunList = [];
                if (message.GunList && message.GunList.length) {
                    object.GunList = [];
                    for (let j = 0; j < message.GunList.length; ++j)
                        object.GunList[j] = $root.gun.v1.GunEntity.toObject(message.GunList[j], options);
                }
                return object;
            };

            /**
             * Converts this GetGunListResponse to JSON.
             * @function toJSON
             * @memberof gun.v1.GetGunListResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetGunListResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetGunListResponse;
        })();

        v1.LockGunRequest = (function() {

            /**
             * Properties of a LockGunRequest.
             * @memberof gun.v1
             * @interface ILockGunRequest
             * @property {string|null} [id] LockGunRequest id
             */

            /**
             * Constructs a new LockGunRequest.
             * @memberof gun.v1
             * @classdesc Represents a LockGunRequest.
             * @implements ILockGunRequest
             * @constructor
             * @param {gun.v1.ILockGunRequest=} [properties] Properties to set
             */
            function LockGunRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LockGunRequest id.
             * @member {string} id
             * @memberof gun.v1.LockGunRequest
             * @instance
             */
            LockGunRequest.prototype.id = "";

            /**
             * Creates a LockGunRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.LockGunRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.LockGunRequest} LockGunRequest
             */
            LockGunRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.LockGunRequest)
                    return object;
                let message = new $root.gun.v1.LockGunRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a LockGunRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.LockGunRequest
             * @static
             * @param {gun.v1.LockGunRequest} message LockGunRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LockGunRequest.toObject = function toObject(message, options) {
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
             * Converts this LockGunRequest to JSON.
             * @function toJSON
             * @memberof gun.v1.LockGunRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LockGunRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LockGunRequest;
        })();

        v1.LockGunResponse = (function() {

            /**
             * Properties of a LockGunResponse.
             * @memberof gun.v1
             * @interface ILockGunResponse
             */

            /**
             * Constructs a new LockGunResponse.
             * @memberof gun.v1
             * @classdesc Represents a LockGunResponse.
             * @implements ILockGunResponse
             * @constructor
             * @param {gun.v1.ILockGunResponse=} [properties] Properties to set
             */
            function LockGunResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a LockGunResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.LockGunResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.LockGunResponse} LockGunResponse
             */
            LockGunResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.LockGunResponse)
                    return object;
                return new $root.gun.v1.LockGunResponse();
            };

            /**
             * Creates a plain object from a LockGunResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.LockGunResponse
             * @static
             * @param {gun.v1.LockGunResponse} message LockGunResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LockGunResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this LockGunResponse to JSON.
             * @function toJSON
             * @memberof gun.v1.LockGunResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LockGunResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LockGunResponse;
        })();

        v1.UnlockGunRequest = (function() {

            /**
             * Properties of an UnlockGunRequest.
             * @memberof gun.v1
             * @interface IUnlockGunRequest
             * @property {string|null} [id] UnlockGunRequest id
             * @property {gun.v1.IDriver|null} [driver] UnlockGunRequest driver
             * @property {string|null} [tripId] UnlockGunRequest tripId
             */

            /**
             * Constructs a new UnlockGunRequest.
             * @memberof gun.v1
             * @classdesc Represents an UnlockGunRequest.
             * @implements IUnlockGunRequest
             * @constructor
             * @param {gun.v1.IUnlockGunRequest=} [properties] Properties to set
             */
            function UnlockGunRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UnlockGunRequest id.
             * @member {string} id
             * @memberof gun.v1.UnlockGunRequest
             * @instance
             */
            UnlockGunRequest.prototype.id = "";

            /**
             * UnlockGunRequest driver.
             * @member {gun.v1.IDriver|null|undefined} driver
             * @memberof gun.v1.UnlockGunRequest
             * @instance
             */
            UnlockGunRequest.prototype.driver = null;

            /**
             * UnlockGunRequest tripId.
             * @member {string} tripId
             * @memberof gun.v1.UnlockGunRequest
             * @instance
             */
            UnlockGunRequest.prototype.tripId = "";

            /**
             * Creates an UnlockGunRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.UnlockGunRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.UnlockGunRequest} UnlockGunRequest
             */
            UnlockGunRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.UnlockGunRequest)
                    return object;
                let message = new $root.gun.v1.UnlockGunRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.driver != null) {
                    if (typeof object.driver !== "object")
                        throw TypeError(".gun.v1.UnlockGunRequest.driver: object expected");
                    message.driver = $root.gun.v1.Driver.fromObject(object.driver);
                }
                if (object.tripId != null)
                    message.tripId = String(object.tripId);
                return message;
            };

            /**
             * Creates a plain object from an UnlockGunRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.UnlockGunRequest
             * @static
             * @param {gun.v1.UnlockGunRequest} message UnlockGunRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlockGunRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.driver = null;
                    object.tripId = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.driver != null && message.hasOwnProperty("driver"))
                    object.driver = $root.gun.v1.Driver.toObject(message.driver, options);
                if (message.tripId != null && message.hasOwnProperty("tripId"))
                    object.tripId = message.tripId;
                return object;
            };

            /**
             * Converts this UnlockGunRequest to JSON.
             * @function toJSON
             * @memberof gun.v1.UnlockGunRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlockGunRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnlockGunRequest;
        })();

        v1.UnlockGunResponse = (function() {

            /**
             * Properties of an UnlockGunResponse.
             * @memberof gun.v1
             * @interface IUnlockGunResponse
             */

            /**
             * Constructs a new UnlockGunResponse.
             * @memberof gun.v1
             * @classdesc Represents an UnlockGunResponse.
             * @implements IUnlockGunResponse
             * @constructor
             * @param {gun.v1.IUnlockGunResponse=} [properties] Properties to set
             */
            function UnlockGunResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates an UnlockGunResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.UnlockGunResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.UnlockGunResponse} UnlockGunResponse
             */
            UnlockGunResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.UnlockGunResponse)
                    return object;
                return new $root.gun.v1.UnlockGunResponse();
            };

            /**
             * Creates a plain object from an UnlockGunResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.UnlockGunResponse
             * @static
             * @param {gun.v1.UnlockGunResponse} message UnlockGunResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlockGunResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UnlockGunResponse to JSON.
             * @function toJSON
             * @memberof gun.v1.UnlockGunResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlockGunResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnlockGunResponse;
        })();

        v1.UpdateGunRequest = (function() {

            /**
             * Properties of an UpdateGunRequest.
             * @memberof gun.v1
             * @interface IUpdateGunRequest
             * @property {string|null} [id] UpdateGunRequest id
             * @property {gun.v1.GunStatus|null} [status] UpdateGunRequest status
             * @property {gun.v1.ILocation|null} [position] UpdateGunRequest position
             */

            /**
             * Constructs a new UpdateGunRequest.
             * @memberof gun.v1
             * @classdesc Represents an UpdateGunRequest.
             * @implements IUpdateGunRequest
             * @constructor
             * @param {gun.v1.IUpdateGunRequest=} [properties] Properties to set
             */
            function UpdateGunRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateGunRequest id.
             * @member {string} id
             * @memberof gun.v1.UpdateGunRequest
             * @instance
             */
            UpdateGunRequest.prototype.id = "";

            /**
             * UpdateGunRequest status.
             * @member {gun.v1.GunStatus} status
             * @memberof gun.v1.UpdateGunRequest
             * @instance
             */
            UpdateGunRequest.prototype.status = 0;

            /**
             * UpdateGunRequest position.
             * @member {gun.v1.ILocation|null|undefined} position
             * @memberof gun.v1.UpdateGunRequest
             * @instance
             */
            UpdateGunRequest.prototype.position = null;

            /**
             * Creates an UpdateGunRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.UpdateGunRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.UpdateGunRequest} UpdateGunRequest
             */
            UpdateGunRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.UpdateGunRequest)
                    return object;
                let message = new $root.gun.v1.UpdateGunRequest();
                if (object.id != null)
                    message.id = String(object.id);
                switch (object.status) {
                case "GS_NO_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "LOCKED":
                case 1:
                    message.status = 1;
                    break;
                case "UNLOCKING":
                case 2:
                    message.status = 2;
                    break;
                case "UNLOCKED":
                case 3:
                    message.status = 3;
                    break;
                case "LOCKING":
                case 4:
                    message.status = 4;
                    break;
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".gun.v1.UpdateGunRequest.position: object expected");
                    message.position = $root.gun.v1.Location.fromObject(object.position);
                }
                return message;
            };

            /**
             * Creates a plain object from an UpdateGunRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.UpdateGunRequest
             * @static
             * @param {gun.v1.UpdateGunRequest} message UpdateGunRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateGunRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.status = options.enums === String ? "GS_NO_SPECIFIED" : 0;
                    object.position = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.gun.v1.GunStatus[message.status] : message.status;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.gun.v1.Location.toObject(message.position, options);
                return object;
            };

            /**
             * Converts this UpdateGunRequest to JSON.
             * @function toJSON
             * @memberof gun.v1.UpdateGunRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateGunRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateGunRequest;
        })();

        v1.UpdateGunResponse = (function() {

            /**
             * Properties of an UpdateGunResponse.
             * @memberof gun.v1
             * @interface IUpdateGunResponse
             */

            /**
             * Constructs a new UpdateGunResponse.
             * @memberof gun.v1
             * @classdesc Represents an UpdateGunResponse.
             * @implements IUpdateGunResponse
             * @constructor
             * @param {gun.v1.IUpdateGunResponse=} [properties] Properties to set
             */
            function UpdateGunResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates an UpdateGunResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof gun.v1.UpdateGunResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {gun.v1.UpdateGunResponse} UpdateGunResponse
             */
            UpdateGunResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.gun.v1.UpdateGunResponse)
                    return object;
                return new $root.gun.v1.UpdateGunResponse();
            };

            /**
             * Creates a plain object from an UpdateGunResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof gun.v1.UpdateGunResponse
             * @static
             * @param {gun.v1.UpdateGunResponse} message UpdateGunResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateGunResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UpdateGunResponse to JSON.
             * @function toJSON
             * @memberof gun.v1.UpdateGunResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateGunResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateGunResponse;
        })();

        v1.GunService = (function() {

            /**
             * Constructs a new GunService service.
             * @memberof gun.v1
             * @classdesc Represents a GunService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function GunService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (GunService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = GunService;

            /**
             * Callback as used by {@link gun.v1.GunService#createGun}.
             * @memberof gun.v1.GunService
             * @typedef CreateGunCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {gun.v1.GunEntity} [response] GunEntity
             */

            /**
             * Calls CreateGun.
             * @function createGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.ICreateGunRequest} request CreateGunRequest message or plain object
             * @param {gun.v1.GunService.CreateGunCallback} callback Node-style callback called with the error, if any, and GunEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(GunService.prototype.createGun = function createGun(request, callback) {
                return this.rpcCall(createGun, $root.gun.v1.CreateGunRequest, $root.gun.v1.GunEntity, request, callback);
            }, "name", { value: "CreateGun" });

            /**
             * Calls CreateGun.
             * @function createGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.ICreateGunRequest} request CreateGunRequest message or plain object
             * @returns {Promise<gun.v1.GunEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link gun.v1.GunService#getGun}.
             * @memberof gun.v1.GunService
             * @typedef GetGunCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {gun.v1.Gun} [response] Gun
             */

            /**
             * Calls GetGun.
             * @function getGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IGetGunRequest} request GetGunRequest message or plain object
             * @param {gun.v1.GunService.GetGunCallback} callback Node-style callback called with the error, if any, and Gun
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(GunService.prototype.getGun = function getGun(request, callback) {
                return this.rpcCall(getGun, $root.gun.v1.GetGunRequest, $root.gun.v1.Gun, request, callback);
            }, "name", { value: "GetGun" });

            /**
             * Calls GetGun.
             * @function getGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IGetGunRequest} request GetGunRequest message or plain object
             * @returns {Promise<gun.v1.Gun>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link gun.v1.GunService#getGunList}.
             * @memberof gun.v1.GunService
             * @typedef GetGunListCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {gun.v1.GetGunListResponse} [response] GetGunListResponse
             */

            /**
             * Calls GetGunList.
             * @function getGunList
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IGetGunListRequest} request GetGunListRequest message or plain object
             * @param {gun.v1.GunService.GetGunListCallback} callback Node-style callback called with the error, if any, and GetGunListResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(GunService.prototype.getGunList = function getGunList(request, callback) {
                return this.rpcCall(getGunList, $root.gun.v1.GetGunListRequest, $root.gun.v1.GetGunListResponse, request, callback);
            }, "name", { value: "GetGunList" });

            /**
             * Calls GetGunList.
             * @function getGunList
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IGetGunListRequest} request GetGunListRequest message or plain object
             * @returns {Promise<gun.v1.GetGunListResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link gun.v1.GunService#lockGun}.
             * @memberof gun.v1.GunService
             * @typedef LockGunCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {gun.v1.LockGunResponse} [response] LockGunResponse
             */

            /**
             * Calls LockGun.
             * @function lockGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.ILockGunRequest} request LockGunRequest message or plain object
             * @param {gun.v1.GunService.LockGunCallback} callback Node-style callback called with the error, if any, and LockGunResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(GunService.prototype.lockGun = function lockGun(request, callback) {
                return this.rpcCall(lockGun, $root.gun.v1.LockGunRequest, $root.gun.v1.LockGunResponse, request, callback);
            }, "name", { value: "LockGun" });

            /**
             * Calls LockGun.
             * @function lockGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.ILockGunRequest} request LockGunRequest message or plain object
             * @returns {Promise<gun.v1.LockGunResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link gun.v1.GunService#unlockGun}.
             * @memberof gun.v1.GunService
             * @typedef UnlockGunCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {gun.v1.UnlockGunResponse} [response] UnlockGunResponse
             */

            /**
             * Calls UnlockGun.
             * @function unlockGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IUnlockGunRequest} request UnlockGunRequest message or plain object
             * @param {gun.v1.GunService.UnlockGunCallback} callback Node-style callback called with the error, if any, and UnlockGunResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(GunService.prototype.unlockGun = function unlockGun(request, callback) {
                return this.rpcCall(unlockGun, $root.gun.v1.UnlockGunRequest, $root.gun.v1.UnlockGunResponse, request, callback);
            }, "name", { value: "UnlockGun" });

            /**
             * Calls UnlockGun.
             * @function unlockGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IUnlockGunRequest} request UnlockGunRequest message or plain object
             * @returns {Promise<gun.v1.UnlockGunResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link gun.v1.GunService#updateGun}.
             * @memberof gun.v1.GunService
             * @typedef UpdateGunCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {gun.v1.UpdateGunResponse} [response] UpdateGunResponse
             */

            /**
             * Calls UpdateGun.
             * @function updateGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IUpdateGunRequest} request UpdateGunRequest message or plain object
             * @param {gun.v1.GunService.UpdateGunCallback} callback Node-style callback called with the error, if any, and UpdateGunResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(GunService.prototype.updateGun = function updateGun(request, callback) {
                return this.rpcCall(updateGun, $root.gun.v1.UpdateGunRequest, $root.gun.v1.UpdateGunResponse, request, callback);
            }, "name", { value: "UpdateGun" });

            /**
             * Calls UpdateGun.
             * @function updateGun
             * @memberof gun.v1.GunService
             * @instance
             * @param {gun.v1.IUpdateGunRequest} request UpdateGunRequest message or plain object
             * @returns {Promise<gun.v1.UpdateGunResponse>} Promise
             * @variation 2
             */

            return GunService;
        })();

        return v1;
    })();

    return gun;
})();