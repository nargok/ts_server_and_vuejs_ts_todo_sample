/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/application/repositories/ITaskRepository.ts":
/*!*********************************************************!*\
  !*** ./src/application/repositories/ITaskRepository.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ITaskRepository = void 0;
class ITaskRepository {
}
exports.ITaskRepository = ITaskRepository;


/***/ }),

/***/ "./src/application/useCases/CreateTask.ts":
/*!************************************************!*\
  !*** ./src/application/useCases/CreateTask.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTask = void 0;
const Task_1 = __webpack_require__(/*! ../../domain/models/Task */ "./src/domain/models/Task.ts");
class CreateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    execute(title) {
        let task = new Task_1.Task(title);
        return this.taskRepository.persist(task);
    }
}
exports.CreateTask = CreateTask;


/***/ }),

/***/ "./src/domain/models/Task.ts":
/*!***********************************!*\
  !*** ./src/domain/models/Task.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Task = void 0;
class Task {
    constructor(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
}
exports.Task = Task;


/***/ }),

/***/ "./src/infrastructure/PostgresConnection.ts":
/*!**************************************************!*\
  !*** ./src/infrastructure/PostgresConnection.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresConnection = void 0;
const pg_1 = __webpack_require__(/*! pg */ "pg");
const IDBConnection_1 = __webpack_require__(/*! ../interfaces/database/IDBConnection */ "./src/interfaces/database/IDBConnection.ts");
class PostgresConnection extends IDBConnection_1.IDBConnection {
    constructor() {
        super();
        this.pool = new pg_1.Pool();
        this.pool = new pg_1.Pool({
            database: "development",
            user: "root",
            host: "127.0.0.1",
            port: 5432,
        });
    }
    async execute(query, params) {
        if (params !== null) {
            return this.pool.query(query, params);
        }
        else {
            return this.pool.query(query);
        }
    }
    async relseae() {
        const client = await this.pool.connect();
        client.relseae();
    }
}
exports.PostgresConnection = PostgresConnection;


/***/ }),

/***/ "./src/infrastructure/dbAccessor.ts":
/*!******************************************!*\
  !*** ./src/infrastructure/dbAccessor.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBAccessor = void 0;
const pg_1 = __webpack_require__(/*! pg */ "pg");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const pool = new pg_1.Pool({
    database: "development",
    user: "root",
    host: "127.0.0.1",
    port: 5432,
});
class DBAccessor {
    constructor() {
        this.get = async () => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'select * from public."TodoTasks"',
                };
                const result = await client.query(query);
                return result.rows;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
            finally {
                client.release();
            }
        };
        this.create = async (title) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
                    values: [(0, uuid_1.v4)(), title],
                };
                const result = await client.query(query);
                return result.rows;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
            finally {
                client.release();
            }
        };
        this.update = async ({ uuid, title, status, }) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'update public."TodoTasks" set title = $2 where uuid = $1',
                    values: [uuid, title],
                };
                const result = await client.query(query);
                return result.rows;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
            finally {
                client.release();
            }
        };
        this.delete = async ({ uuid }) => {
            const client = await pool.connect();
            try {
                const query = {
                    text: 'delete from public."TodoTasks" where uuid = $1',
                    values: [uuid],
                };
                const result = await client.query(query);
                return result.rows;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
            finally {
                client.release();
            }
        };
    }
}
exports.DBAccessor = DBAccessor;


/***/ }),

/***/ "./src/infrastructure/index.ts":
/*!*************************************!*\
  !*** ./src/infrastructure/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const router_1 = __webpack_require__(/*! ./router */ "./src/infrastructure/router.ts");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 3000;
app.use("/", (0, router_1.createRouter)());
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});


/***/ }),

/***/ "./src/infrastructure/router.ts":
/*!**************************************!*\
  !*** ./src/infrastructure/router.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRouter = void 0;
const express_1 = __webpack_require__(/*! express */ "express");
const dbAccessor_1 = __webpack_require__(/*! ./dbAccessor */ "./src/infrastructure/dbAccessor.ts");
const TasksController_1 = __webpack_require__(/*! ../interfaces/controllers/TasksController */ "./src/interfaces/controllers/TasksController.ts");
const PostgresConnection_1 = __webpack_require__(/*! ./PostgresConnection */ "./src/infrastructure/PostgresConnection.ts");
const dbAccessor = new dbAccessor_1.DBAccessor();
const postgresConnection = new PostgresConnection_1.PostgresConnection();
const tasksController = new TasksController_1.TasksController(postgresConnection);
const createRouter = () => {
    const router = (0, express_1.Router)();
    router.get("/", async (req, res) => {
        try {
            const resBody = await dbAccessor.get();
            res.status(200).send({ message: "get success", resBody });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: "get failded" });
        }
    });
    router.post("/", async (req, res) => {
        let result = await tasksController.createTask(req, res);
        res.send(result);
    });
    router.put("/:taskID", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: "body required" });
            }
            await dbAccessor.update({ uuid: req.params.taskID, ...req.body });
            res.status(200).send({ message: "update success" });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: "update failded" });
        }
    });
    router.delete("/:taskID", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: "body required" });
            }
            await dbAccessor.delete({ uuid: req.params.taskID });
            res.status(200).send({ message: "delete success" });
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ message: "delete failded" });
        }
    });
    return router;
};
exports.createRouter = createRouter;


/***/ }),

/***/ "./src/interfaces/controllers/TasksController.ts":
/*!*******************************************************!*\
  !*** ./src/interfaces/controllers/TasksController.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksController = void 0;
const TaskSerializer_1 = __webpack_require__(/*! ../serializers/TaskSerializer */ "./src/interfaces/serializers/TaskSerializer.ts");
const TaskRepository_1 = __webpack_require__(/*! ../database/TaskRepository */ "./src/interfaces/database/TaskRepository.ts");
const CreateTask_1 = __webpack_require__(/*! ../..//application/useCases/CreateTask */ "./src/application/useCases/CreateTask.ts");
class TasksController {
    constructor(dbConnection) {
        this.taskSerializer = new TaskSerializer_1.TaskSerializer();
        this.taskRepository = new TaskRepository_1.TaskRepository(dbConnection);
    }
    async createTask(req, res) {
        const { title } = req.body;
        const useCase = new CreateTask_1.CreateTask(this.taskRepository);
        const result = await useCase.execute(title);
        return this.taskSerializer.serialize(result);
    }
}
exports.TasksController = TasksController;


/***/ }),

/***/ "./src/interfaces/database/IDBConnection.ts":
/*!**************************************************!*\
  !*** ./src/interfaces/database/IDBConnection.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IDBConnection = void 0;
class IDBConnection {
}
exports.IDBConnection = IDBConnection;


/***/ }),

/***/ "./src/interfaces/database/TaskRepository.ts":
/*!***************************************************!*\
  !*** ./src/interfaces/database/TaskRepository.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskRepository = void 0;
const ITaskRepository_1 = __webpack_require__(/*! ../../application/repositories/ITaskRepository */ "./src/application/repositories/ITaskRepository.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
class TaskRepository extends ITaskRepository_1.ITaskRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    async persist(task) {
        const { title } = task;
        try {
            const query = {
                text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
                values: [(0, uuid_1.v4)(), title],
            };
            const result = await this.connection.execute(query);
            return result;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        finally {
        }
    }
}
exports.TaskRepository = TaskRepository;


/***/ }),

/***/ "./src/interfaces/serializers/TaskSerializer.ts":
/*!******************************************************!*\
  !*** ./src/interfaces/serializers/TaskSerializer.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskSerializer = void 0;
const _serializeSingleTask = (task) => {
    return {
        title: task.title,
    };
};
class TaskSerializer {
    serialize(data) {
        if (!data) {
            throw new Error("except data to be not undefined nor null");
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleTask);
        }
        return _serializeSingleTask(data);
    }
}
exports.TaskSerializer = TaskSerializer;


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/infrastructure/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUFWRCx3Q0FVQzs7Ozs7Ozs7Ozs7QUNuQkQ7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvYXBwbGljYXRpb24vcmVwb3NpdG9yaWVzL0lUYXNrUmVwb3NpdG9yeS50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvYXBwbGljYXRpb24vdXNlQ2FzZXMvQ3JlYXRlVGFzay50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zcmMvZG9tYWluL21vZGVscy9UYXNrLnRzIiwid2VicGFjazovL3NlcnZlci8uL3NyYy9pbmZyYXN0cnVjdHVyZS9Qb3N0Z3Jlc0Nvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2luZnJhc3RydWN0dXJlL2RiQWNjZXNzb3IudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2luZnJhc3RydWN0dXJlL2luZGV4LnRzIiwid2VicGFjazovL3NlcnZlci8uL3NyYy9pbmZyYXN0cnVjdHVyZS9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2ludGVyZmFjZXMvY29udHJvbGxlcnMvVGFza3NDb250cm9sbGVyLnRzIiwid2VicGFjazovL3NlcnZlci8uL3NyYy9pbnRlcmZhY2VzL2RhdGFiYXNlL0lEQkNvbm5lY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2ludGVyZmFjZXMvZGF0YWJhc2UvVGFza1JlcG9zaXRvcnkudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc3JjL2ludGVyZmFjZXMvc2VyaWFsaXplcnMvVGFza1NlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIGNvbW1vbmpzIFwiY29yc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBjb21tb25qcyBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJwZ1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBjb21tb25qcyBcInV1aWRcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2VydmVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2VydmVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vLi4vZG9tYWluL21vZGVscy9UYXNrXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJVGFza1JlcG9zaXRvcnkge1xuICBhYnN0cmFjdCBwZXJzaXN0KHRhc2s6IFRhc2spOiBQcm9taXNlPFRhc2s+O1xufVxuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9kb21haW4vbW9kZWxzL1Rhc2tcIjtcbmltcG9ydCB7IElUYXNrUmVwb3NpdG9yeSB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvSVRhc2tSZXBvc2l0b3J5XCI7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVUYXNrIHtcbiAgcHJpdmF0ZSB0YXNrUmVwb3NpdG9yeTogSVRhc2tSZXBvc2l0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKHRhc2tSZXBvc2l0b3J5OiBJVGFza1JlcG9zaXRvcnkpIHtcbiAgICB0aGlzLnRhc2tSZXBvc2l0b3J5ID0gdGFza1JlcG9zaXRvcnk7XG4gIH1cblxuICBleGVjdXRlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICBsZXQgdGFzayA9IG5ldyBUYXNrKHRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy50YXNrUmVwb3NpdG9yeS5wZXJzaXN0KHRhc2spO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVGFzayB7XG4gIC8vIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gIHByaXZhdGUgX3RpdGxlOiBzdHJpbmc7XG5cbiAgLy8gZ2V0IGlkKCk6IHN0cmluZyB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX2lkO1xuICAvLyB9XG5cbiAgLy8gc2V0IGlkKGlkOiBzdHJpbmcpIHtcbiAgLy8gICB0aGlzLl9pZCA9IGlkO1xuICAvLyB9XG5cbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICB9XG5cbiAgc2V0IHRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZykge1xuICAgIHRoaXMuX3RpdGxlID0gdGl0bGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBvb2wgfSBmcm9tIFwicGdcIjtcbmltcG9ydCB7IElEQkNvbm5lY3Rpb24gfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9kYXRhYmFzZS9JREJDb25uZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3N0Z3Jlc0Nvbm5lY3Rpb24gZXh0ZW5kcyBJREJDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSBwb29sOiBhbnkgPSBuZXcgUG9vbCgpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woe1xuICAgICAgZGF0YWJhc2U6IFwiZGV2ZWxvcG1lbnRcIixcbiAgICAgIHVzZXI6IFwicm9vdFwiLFxuICAgICAgaG9zdDogXCIxMjcuMC4wLjFcIixcbiAgICAgIHBvcnQ6IDU0MzIsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBleGVjdXRlKHF1ZXJ5OiBzdHJpbmcsIHBhcmFtczogc3RyaW5nKSB7XG4gICAgLy8gY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5wb29sLmNvbm5lY3QoKTtcbiAgICBpZiAocGFyYW1zICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb29sLnF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wb29sLnF1ZXJ5KHF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWxzZWFlKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMucG9vbC5jb25uZWN0KCk7XG4gICAgY2xpZW50LnJlbHNlYWUoKTtcbiAgfVxufVxuXG4vLyBjb25zdCBwb29sID0gbmV3IFBvb2woe1xuLy8gICBkYXRhYmFzZTogXCJkZXZlbG9wbWVudFwiLFxuLy8gICB1c2VyOiBcInJvb3RcIixcbi8vICAgaG9zdDogXCIxMjcuMC4wLjFcIixcbi8vICAgcG9ydDogNTQzMixcbi8vIH0pO1xuXG4vLyBleHBvcnQgY2xhc3MgREJBY2Nlc3NvciB7XG4vLyAgIHB1YmxpYyBnZXQgPSBhc3luYyAoKSA9PiB7XG4vLyAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4vLyAgICAgdHJ5IHtcbi8vICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuLy8gICAgICAgICB0ZXh0OiAnc2VsZWN0ICogZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIicsXG4vLyAgICAgICB9O1xuLy8gICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbi8vICAgICAgIHJldHVybiByZXN1bHQucm93cztcbi8vICAgICB9IGNhdGNoIChlKSB7XG4vLyAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuLy8gICAgICAgdGhyb3cgZTtcbi8vICAgICB9IGZpbmFsbHkge1xuLy8gICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbi8vICAgICB9XG4vLyAgIH07XG4iLCJpbXBvcnQgeyBQb29sIH0gZnJvbSBcInBnXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tIFwidXVpZFwiO1xuXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICBkYXRhYmFzZTogXCJkZXZlbG9wbWVudFwiLFxuICB1c2VyOiBcInJvb3RcIixcbiAgaG9zdDogXCIxMjcuMC4wLjFcIixcbiAgcG9ydDogNTQzMixcbn0pO1xuXG5leHBvcnQgY2xhc3MgREJBY2Nlc3NvciB7XG4gIHB1YmxpYyBnZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnc2VsZWN0ICogZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIicsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXN1bHQucm93cztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIGNyZWF0ZSA9IGFzeW5jICh0aXRsZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnaW5zZXJ0IGludG8gcHVibGljLlwiVG9kb1Rhc2tzXCIgKHV1aWQsIHRpdGxlLCBcImNyZWF0ZWRBdFwiLCBcInVwZGF0ZWRBdFwiKSBWQUxVRVMoJDEsICQyLCBjdXJyZW50X3RpbWVzdGFtcCwgY3VycmVudF90aW1lc3RhbXApJyxcbiAgICAgICAgdmFsdWVzOiBbdXVpZHY0KCksIHRpdGxlXSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5yb3dzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgdXBkYXRlID0gYXN5bmMgKHtcbiAgICB1dWlkLFxuICAgIHRpdGxlLFxuICAgIHN0YXR1cyxcbiAgfToge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICB9KSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAndXBkYXRlIHB1YmxpYy5cIlRvZG9UYXNrc1wiIHNldCB0aXRsZSA9ICQyIHdoZXJlIHV1aWQgPSAkMScsXG4gICAgICAgIHZhbHVlczogW3V1aWQsIHRpdGxlXSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnQucXVlcnkocXVlcnkpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5yb3dzO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgZGVsZXRlID0gYXN5bmMgKHsgdXVpZCB9OiB7IHV1aWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnZGVsZXRlIGZyb20gcHVibGljLlwiVG9kb1Rhc2tzXCIgd2hlcmUgdXVpZCA9ICQxJyxcbiAgICAgICAgdmFsdWVzOiBbdXVpZF0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIHJldHVybiByZXN1bHQucm93cztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGNvcnMgZnJvbSBcImNvcnNcIjtcbmltcG9ydCB7IGNyZWF0ZVJvdXRlciB9IGZyb20gXCIuL3JvdXRlclwiOyAvLyB0b2RvIOOBk+OBk+OCkuWkieOBiOOCi1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGNvcnMoKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG5jb25zdCBwb3J0ID0gMzAwMDtcblxuYXBwLnVzZShcIi9cIiwgY3JlYXRlUm91dGVyKCkpO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYExpc3RlbmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKTtcbn0pO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IERCQWNjZXNzb3IgfSBmcm9tIFwiLi9kYkFjY2Vzc29yXCI7XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgVGFza3NDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29udHJvbGxlcnMvVGFza3NDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBQb3N0Z3Jlc0Nvbm5lY3Rpb24gfSBmcm9tIFwiLi9Qb3N0Z3Jlc0Nvbm5lY3Rpb25cIjtcblxuY29uc3QgZGJBY2Nlc3NvciA9IG5ldyBEQkFjY2Vzc29yKCk7XG5jb25zdCBwb3N0Z3Jlc0Nvbm5lY3Rpb24gPSBuZXcgUG9zdGdyZXNDb25uZWN0aW9uKCk7XG5jb25zdCB0YXNrc0NvbnRyb2xsZXIgPSBuZXcgVGFza3NDb250cm9sbGVyKHBvc3RncmVzQ29ubmVjdGlvbik7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSb3V0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG4gIHJvdXRlci5nZXQoXCIvXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNCb2R5ID0gYXdhaXQgZGJBY2Nlc3Nvci5nZXQoKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogXCJnZXQgc3VjY2Vzc1wiLCByZXNCb2R5IH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiBcImdldCBmYWlsZGVkXCIgfSk7XG4gICAgfVxuICB9KTtcblxuICByb3V0ZXIucG9zdChcIi9cIiwgYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGFza3NDb250cm9sbGVyLmNyZWF0ZVRhc2socmVxLCByZXMpO1xuICAgIHJlcy5zZW5kKHJlc3VsdCk7XG4gICAgLy8gdHJ5IHtcbiAgICAvLyAgIGlmICghcmVxLmJvZHkudGl0bGUpIHtcbiAgICAvLyAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiBcInRpdGxlIHJlcXVpcmVkXCIgfSk7XG4gICAgLy8gICB9XG4gICAgLy8gICBhd2FpdCBkYkFjY2Vzc29yLmNyZWF0ZShyZXEuYm9keS50aXRsZSk7XG4gICAgLy8gICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IG1lc3NhZ2U6IFwiY3JlYXRlIHN1Y2Nlc3NcIiB9KTtcbiAgICAvLyB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAvLyAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogXCJjcmVhdGUgZmFpbGRlZFwiIH0pO1xuICAgIC8vIH1cbiAgfSk7XG5cbiAgcm91dGVyLnB1dChcIi86dGFza0lEXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXJlcS5ib2R5KSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogXCJib2R5IHJlcXVpcmVkXCIgfSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBkYkFjY2Vzc29yLnVwZGF0ZSh7IHV1aWQ6IHJlcS5wYXJhbXMudGFza0lELCAuLi5yZXEuYm9keSB9KTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgbWVzc2FnZTogXCJ1cGRhdGUgc3VjY2Vzc1wiIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiBcInVwZGF0ZSBmYWlsZGVkXCIgfSk7XG4gICAgfVxuICB9KTtcblxuICByb3V0ZXIuZGVsZXRlKFwiLzp0YXNrSURcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghcmVxLmJvZHkpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiBcImJvZHkgcmVxdWlyZWRcIiB9KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGRiQWNjZXNzb3IuZGVsZXRlKHsgdXVpZDogcmVxLnBhcmFtcy50YXNrSUQgfSk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IG1lc3NhZ2U6IFwiZGVsZXRlIHN1Y2Nlc3NcIiB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogXCJkZWxldGUgZmFpbGRlZFwiIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn07XG4iLCJpbXBvcnQgeyBUYXNrU2VyaWFsaXplciB9IGZyb20gXCIuLi9zZXJpYWxpemVycy9UYXNrU2VyaWFsaXplclwiO1xuaW1wb3J0IHsgVGFza1JlcG9zaXRvcnkgfSBmcm9tIFwiLi4vZGF0YWJhc2UvVGFza1JlcG9zaXRvcnlcIjtcbmltcG9ydCB7IElEQkNvbm5lY3Rpb24gfSBmcm9tIFwiLi4vZGF0YWJhc2UvSURCQ29ubmVjdGlvblwiO1xuaW1wb3J0IHsgQ3JlYXRlVGFzayB9IGZyb20gXCIuLi8uLi8vYXBwbGljYXRpb24vdXNlQ2FzZXMvQ3JlYXRlVGFza1wiO1xuXG5leHBvcnQgY2xhc3MgVGFza3NDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSB0YXNrU2VyaWFsaXplcjogVGFza1NlcmlhbGl6ZXI7XG4gIHByaXZhdGUgdGFza1JlcG9zaXRvcnk6IFRhc2tSZXBvc2l0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKGRiQ29ubmVjdGlvbjogSURCQ29ubmVjdGlvbikge1xuICAgIHRoaXMudGFza1NlcmlhbGl6ZXIgPSBuZXcgVGFza1NlcmlhbGl6ZXIoKTtcbiAgICB0aGlzLnRhc2tSZXBvc2l0b3J5ID0gbmV3IFRhc2tSZXBvc2l0b3J5KGRiQ29ubmVjdGlvbik7XG4gIH1cblxuICBhc3luYyBjcmVhdGVUYXNrKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgIGNvbnN0IHsgdGl0bGUgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHVzZUNhc2UgPSBuZXcgQ3JlYXRlVGFzayh0aGlzLnRhc2tSZXBvc2l0b3J5KTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1c2VDYXNlLmV4ZWN1dGUodGl0bGUpO1xuICAgIHJldHVybiB0aGlzLnRhc2tTZXJpYWxpemVyLnNlcmlhbGl6ZShyZXN1bHQpO1xuICB9XG59XG4iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgSURCQ29ubmVjdGlvbiB7XG4gIGFic3RyYWN0IGV4ZWN1dGUocXVlcnk6IHN0cmluZywgcGFyYW1zOiBzdHJpbmcpOiBhbnk7XG59XG4iLCJpbXBvcnQgeyBJVGFza1JlcG9zaXRvcnkgfSBmcm9tIFwiLi4vLi4vYXBwbGljYXRpb24vcmVwb3NpdG9yaWVzL0lUYXNrUmVwb3NpdG9yeVwiO1xuaW1wb3J0IHsgSURCQ29ubmVjdGlvbiB9IGZyb20gXCIuL0lEQkNvbm5lY3Rpb25cIjtcbi8vIGltcG9ydCB7IFBvb2wgfSBmcm9tIFwicGdcIjtcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uLy4uL2RvbWFpbi9tb2RlbHMvVGFza1wiO1xuXG4vLyBjb25zdCBwb29sID0gbmV3IFBvb2woe1xuLy8gICBkYXRhYmFzZTogXCJkZXZlbG9wbWVudFwiLFxuLy8gICB1c2VyOiBcInJvb3RcIixcbi8vICAgaG9zdDogXCIxMjcuMC4wLjFcIixcbi8vICAgcG9ydDogNTQzMixcbi8vIH0pO1xuXG5leHBvcnQgY2xhc3MgVGFza1JlcG9zaXRvcnkgZXh0ZW5kcyBJVGFza1JlcG9zaXRvcnkge1xuICBwcml2YXRlIGNvbm5lY3Rpb246IGFueTtcblxuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBJREJDb25uZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICB9XG5cbiAgLy8gdG9kbyDkuIDmmYLnmoTjgavjgrPjg6Hjg7Pjg4jjgqLjgqbjg4hcbiAgLy8gcHJpdmF0ZSBjb252ZXJ0TW9kZWwocjogYW55KSB7XG4gIC8vICAgbGV0IHRhc2sgPSBuZXcgVGFzaygpO1xuXG4gIC8vICAgdGFzay5pZCA9IHIuaWQ7XG4gIC8vICAgdGFzay50aXRsZSA9IHIudGl0bGU7XG5cbiAgLy8gICByZXR1cm4gdGFzaztcbiAgLy8gfVxuXG4gIGFzeW5jIHBlcnNpc3QodGFzazogVGFzayk6IFByb21pc2U8VGFzaz4ge1xuICAgIGNvbnN0IHsgdGl0bGUgfSA9IHRhc2s7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB0ZXh0OiAnaW5zZXJ0IGludG8gcHVibGljLlwiVG9kb1Rhc2tzXCIgKHV1aWQsIHRpdGxlLCBcImNyZWF0ZWRBdFwiLCBcInVwZGF0ZWRBdFwiKSBWQUxVRVMoJDEsICQyLCBjdXJyZW50X3RpbWVzdGFtcCwgY3VycmVudF90aW1lc3RhbXApJyxcbiAgICAgICAgdmFsdWVzOiBbdXVpZHY0KCksIHRpdGxlXSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNvbm5lY3Rpb24uZXhlY3V0ZShxdWVyeSk7XG4gICAgICAvLyByZXR1cm4gcmVzdWx0LnJvd3M7XG4gICAgICAvLyB0YXNrLmlkID0gcmVzdWx0LmlkXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyB0aGlzLmNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBjb25zdCBwb29sID0gbmV3IFBvb2woe1xuLy8gICBkYXRhYmFzZTogXCJkZXZlbG9wbWVudFwiLFxuLy8gICB1c2VyOiBcInJvb3RcIixcbi8vICAgaG9zdDogXCIxMjcuMC4wLjFcIixcbi8vICAgcG9ydDogNTQzMixcbi8vIH0pO1xuXG4vLyBleHBvcnQgY2xhc3MgREJBY2Nlc3NvciB7XG4vLyAgIHB1YmxpYyBnZXQgPSBhc3luYyAoKSA9PiB7XG4vLyAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcG9vbC5jb25uZWN0KCk7XG4vLyAgICAgdHJ5IHtcbi8vICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuLy8gICAgICAgICB0ZXh0OiAnc2VsZWN0ICogZnJvbSBwdWJsaWMuXCJUb2RvVGFza3NcIicsXG4vLyAgICAgICB9O1xuLy8gICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5KTtcbi8vICAgICAgIHJldHVybiByZXN1bHQucm93cztcbi8vICAgICB9IGNhdGNoIChlKSB7XG4vLyAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuLy8gICAgICAgdGhyb3cgZTtcbi8vICAgICB9IGZpbmFsbHkge1xuLy8gICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbi8vICAgICB9XG4vLyAgIH07XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uLy4uL2RvbWFpbi9tb2RlbHMvVGFza1wiO1xuXG5jb25zdCBfc2VyaWFsaXplU2luZ2xlVGFzayA9ICh0YXNrOiBUYXNrKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLy8gaWQ6IHRhc2suaWQsXG4gICAgdGl0bGU6IHRhc2sudGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgY2xhc3MgVGFza1NlcmlhbGl6ZXIge1xuICBzZXJpYWxpemUoZGF0YTogYW55KSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJleGNlcHQgZGF0YSB0byBiZSBub3QgdW5kZWZpbmVkIG5vciBudWxsXCIpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEubWFwKF9zZXJpYWxpemVTaW5nbGVUYXNrKTtcbiAgICB9XG4gICAgcmV0dXJuIF9zZXJpYWxpemVTaW5nbGVUYXNrKGRhdGEpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=