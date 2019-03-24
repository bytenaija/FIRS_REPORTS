/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + ".hot/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + ".hot/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "417c80d8897612a2f32b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cra-universal/node_modules/css-loader/index.js!./src/App.css":
/*!**************************************************************************!*\
  !*** ./node_modules/cra-universal/node_modules/css-loader!./src/App.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/cra-universal/node_modules/css-loader/lib/css-base.js */ \"./node_modules/cra-universal/node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\\n\\nsection.hero {\\n  display: grid;\\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\\n  grid-gap: 2rem;\\n}\\n\\n .hero {\\n   width: 100%;\\n   color: #333;\\n   text-align: center;\\n }\\n\\n .title {\\n   margin: 0;\\n   width: 100%;\\n   padding-top: 80px;\\n   line-height: 1.15;\\n   font-size: 48px;\\n }\\n\\n .title,\\n .description {\\n   text-align: center;\\n }\\n\\n .row {\\n   max-width: 880px;\\n   margin: 80px auto 40px;\\n   display: flex;\\n   flex-direction: row;\\n   justify-content: space-around;\\n }\\n\\n .card {\\n   padding: 18px 18px 24px;\\n   width: 220px;\\n   text-align: left;\\n   text-decoration: none;\\n   color: #434343;\\n   border: 1px solid #9b9b9b;\\n }\\n\\n .card:hover {\\n   border-color: #067df7;\\n }\\n\\n .card h3 {\\n   margin: 0;\\n   color: #067df7;\\n   font-size: 18px;\\n }\\n\\n .card p {\\n   margin: 0;\\n   padding: 12px 0 0;\\n   font-size: 13px;\\n   color: #333;\\n }\\n\\n h1, h3{\\n   text-transform: uppercase;\\n }\\n\\n article{\\n   align-items: center;\\n   text-align: center;\\n  background: rgba(230, 227, 227, .5);\\n  padding: 1rem;\\n }\\n\\n #chartPage{\\n   text-align: center;\\n   text-transform: uppercase;\\n }\\n\\n .text-right{\\n   text-align: right;\\n }\\n\\n section{\\n   margin: 2rem 0px;\\n   text-align: center;\\n   display: grid;\\n   align-items: center;\\n }\\n\\n td{\\n   min-width: 7rem;\\n   padding: 1rem;\\n   border: 1px solid black;\\n }\\n\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/App.css?./node_modules/cra-universal/node_modules/css-loader");

/***/ }),

/***/ "./node_modules/cra-universal/node_modules/css-loader/lib/css-base.js":
/*!****************************************************************************!*\
  !*** ./node_modules/cra-universal/node_modules/css-loader/lib/css-base.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \" + item[2] + \"{\" + content + \"}\";\n      } else {\n        return content;\n      }\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === \"string\") modules = [[null, modules, \"\"]];\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n      if (typeof id === \"number\") alreadyImportedModules[id] = true;\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      //  when a module is imported multiple times with different media queries.\n      //  I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/cra-universal/node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-style-loader/lib/insertCss.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"babel-runtime/core-js/json/stringify\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ \"babel-runtime/helpers/slicedToArray\");\n\nvar _slicedToArray3 = _interopRequireDefault(_slicedToArray2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Isomorphic CSS style loader for Webpack\n *\n * Copyright © 2015-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nvar prefix = 's';\nvar inserted = {};\n\n// Base64 encoding and decoding - The \"Unicode Problem\"\n// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem\nfunction b64EncodeUnicode(str) {\n  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {\n    return String.fromCharCode('0x' + p1);\n  }));\n}\n\n/**\n * Remove style/link elements for specified node IDs\n * if they are no longer referenced by UI components.\n */\nfunction removeCss(ids) {\n  ids.forEach(function (id) {\n    if (--inserted[id] <= 0) {\n      var elem = document.getElementById(prefix + id);\n      if (elem) {\n        elem.parentNode.removeChild(elem);\n      }\n    }\n  });\n}\n\n/**\n * Example:\n *   // Insert CSS styles object generated by `css-loader` into DOM\n *   var removeCss = insertCss([[1, 'body { color: red; }']]);\n *\n *   // Remove it from the DOM\n *   removeCss();\n */\nfunction insertCss(styles) {\n  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      _ref$replace = _ref.replace,\n      replace = _ref$replace === undefined ? false : _ref$replace,\n      _ref$prepend = _ref.prepend,\n      prepend = _ref$prepend === undefined ? false : _ref$prepend;\n\n  var ids = [];\n  for (var i = 0; i < styles.length; i++) {\n    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),\n        moduleId = _styles$i[0],\n        css = _styles$i[1],\n        media = _styles$i[2],\n        sourceMap = _styles$i[3];\n\n    var id = moduleId + '-' + i;\n\n    ids.push(id);\n\n    if (inserted[id]) {\n      if (!replace) {\n        inserted[id]++;\n        continue;\n      }\n    }\n\n    inserted[id] = 1;\n\n    var elem = document.getElementById(prefix + id);\n    var create = false;\n\n    if (!elem) {\n      create = true;\n\n      elem = document.createElement('style');\n      elem.setAttribute('type', 'text/css');\n      elem.id = prefix + id;\n\n      if (media) {\n        elem.setAttribute('media', media);\n      }\n    }\n\n    var cssText = css;\n    if (sourceMap && typeof btoa === 'function') {\n      // skip IE9 and below, see http://caniuse.com/atob-btoa\n      cssText += '\\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';\n      cssText += '\\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';\n    }\n\n    if ('textContent' in elem) {\n      elem.textContent = cssText;\n    } else {\n      elem.styleSheet.cssText = cssText;\n    }\n\n    if (create) {\n      if (prepend) {\n        document.head.insertBefore(elem, document.head.childNodes[0]);\n      } else {\n        document.head.appendChild(elem);\n      }\n    }\n  }\n\n  return removeCss.bind(null, ids);\n}\n\nmodule.exports = insertCss;\n\n//# sourceURL=webpack:///./node_modules/isomorphic-style-loader/lib/insertCss.js?");

/***/ }),

/***/ "./node_modules/start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/start-server-webpack-plugin/dist/monitor-loader.js":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/start-server-webpack-plugin/dist/monitor-loader.js ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(() => {\n  // Handle hot updates, copied with slight adjustments from webpack/hot/signal.js\n  if (true) {\n    const log = (type, msg) => console[type](`sswp> ${msg}`);\n    // TODO don't show this when sending signal instead of message\n    log('log', 'Handling Hot Module Reloading');\n    var checkForUpdate = function checkForUpdate(fromUpdate) {\n      module.hot.check().then(function (updatedModules) {\n        if (!updatedModules) {\n          if (fromUpdate) log('log', 'Update applied.');else log('warn', 'Cannot find update.');\n          return;\n        }\n\n        return module.hot.apply({\n          ignoreUnaccepted: true,\n          // TODO probably restart\n          onUnaccepted: function onUnaccepted(data) {\n            log('warn', '\\u0007Ignored an update to unaccepted module ' + data.chain.join(' -> '));\n          }\n        }).then(function (renewedModules) {\n          __webpack_require__(/*! webpack/hot/log-apply-result */ \"webpack/hot/log-apply-result\")(updatedModules, renewedModules);\n\n          checkForUpdate(true);\n        });\n      }).catch(function (err) {\n        var status = module.hot.status();\n        if (['abort', 'fail'].indexOf(status) >= 0) {\n          if (process.send) {\n            process.send('SSWP_HMR_FAIL');\n          }\n          log('warn', 'Cannot apply update.');\n          log('warn', '' + err.stack || err.message);\n          log('error', 'Quitting process - will reload on next file change\\u0007\\n\\u0007\\n\\u0007');\n          process.exit(222);\n        } else {\n          log('warn', 'Update failed: ' + err.stack || false);\n        }\n      });\n    };\n\n    process.on('message', function (message) {\n      if (message !== 'SSWP_HMR') return;\n\n      if (module.hot.status() !== 'idle') {\n        log('warn', 'Got signal but currently in ' + module.hot.status() + ' state.');\n        log('warn', 'Need to be in idle state to start hot update.');\n        return;\n      }\n\n      checkForUpdate();\n    });\n  }\n\n  // Tell our plugin we loaded all the code without initially crashing\n  if (process.send) {\n    process.send('SSWP_LOADED');\n  }\n})()\n\n//# sourceURL=webpack:///./node_modules/start-server-webpack-plugin/dist/monitor-loader.js?./node_modules/start-server-webpack-plugin/dist/monitor-loader.js");

/***/ }),

/***/ "./server/dbConfig.js":
/*!****************************!*\
  !*** ./server/dbConfig.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  user: process.env.NODE_ORACLEDB_USER || \"weblogic\",\n  // Instead of hard coding the password, consider prompting for it,\n  // passing it in an environment variable via process.env, or using\n  // External Authentication.\n  password: process.env.NODE_ORACLEDB_PASSWORD || 'welcome1',\n  // For information on connection strings see:\n  // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings\n  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || \"localhost/bpm1\",\n  // Setting externalAuth is optional.  It defaults to false.  See:\n  // https://oracle.github.io/node-oracledb/doc/api.html#extauth\n  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH = true\n};\n\n//# sourceURL=webpack:///./server/dbConfig.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var oracledb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! oracledb */ \"oracledb\");\n/* harmony import */ var oracledb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(oracledb__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _dbConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dbConfig */ \"./server/dbConfig.js\");\n/* harmony import */ var _dbConfig__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dbConfig__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/App */ \"./src/App.js\");\nvar _jsxFileName = \"C:\\\\Users\\\\T540P\\\\Desktop\\\\projects\\\\2019\\\\firs_report\\\\v-report\\\\server\\\\index.js\";\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\n\n\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\noracledb__WEBPACK_IMPORTED_MODULE_2___default.a.outFormat = oracledb__WEBPACK_IMPORTED_MODULE_2___default.a.OBJECT;\nvar PORT = process.env.PORT || 3008;\nvar app = express__WEBPACK_IMPORTED_MODULE_4___default()();\nvar NODE_ENV = \"development\";\n\nif (NODE_ENV === 'production') {\n  app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.static(\"./client\"));\n  app.get(\"/api\", function (req, res) {\n    try {\n      console.log(_dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a);\n      oracledb__WEBPACK_IMPORTED_MODULE_2___default.a.getConnection({\n        user: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.user,\n        password: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.password,\n        connectString: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.connectString\n      }).then(\n      /*#__PURE__*/\n      function () {\n        var _ref = _asyncToGenerator(\n        /*#__PURE__*/\n        regeneratorRuntime.mark(function _callee(conn) {\n          var currentYearContractSumQuery, currentYearSpendAreasQuery, contractAwardedForYearsQuery, currentYearContractSum, currentYearSpendAreas, liabilitiesInSpendAreas, fecAwardedProjectsCurrentLiabilities, contractAwardedForYears, yearsContractSumVariousSpend;\n          return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  console.log(conn);\n                  currentYearContractSumQuery = 'select contractSubType, count(contractSubType) from reports_vendor group by contractSubType';\n                  currentYearSpendAreasQuery = 'select contractSubType, paymentType, count(contractSubType) from reports_vendor group by contractSubType group by paymentType';\n                  contractAwardedForYearsQuery = 'select contractSubType, trunc(requestDate, \"Year\") from reports_vendor group by contractSubType group by trunc(requestDate, \"Year\")';\n                  _context.next = 6;\n                  return conn.execute(currentYearContractSumQuery);\n\n                case 6:\n                  currentYearContractSum = _context.sent;\n                  _context.next = 9;\n                  return conn.execute(currentYearSpendAreasQuery);\n\n                case 9:\n                  currentYearSpendAreas = _context.sent;\n                  liabilitiesInSpendAreas = [];\n                  fecAwardedProjectsCurrentLiabilities = [];\n                  _context.next = 14;\n                  return conn.execute(contractAwardedForYearsQuery);\n\n                case 14:\n                  contractAwardedForYears = _context.sent;\n                  yearsContractSumVariousSpend = [];\n                  res.json({\n                    currentYearContractSum: currentYearContractSum,\n                    currentYearSpendAreas: currentYearSpendAreas,\n                    liabilitiesInSpendAreas: liabilitiesInSpendAreas,\n                    fecAwardedProjectsCurrentLiabilities: fecAwardedProjectsCurrentLiabilities,\n                    contractAwardedForYears: contractAwardedForYears,\n                    yearsContractSumVariousSpend: yearsContractSumVariousSpend\n                  });\n\n                case 17:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee);\n        }));\n\n        return function (_x) {\n          return _ref.apply(this, arguments);\n        };\n      }()).catch(function (err) {\n        console.log(err);\n        res.status(500).json({\n          err: err\n        });\n      });\n    } catch (err) {\n      console.log(err);\n    }\n  });\n  app.get(\"/*\", function (req, res) {\n    var app = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_src_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 65\n      }\n    }));\n    var indexFile = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(\"./client/index.html\");\n    fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(indexFile, \"utf8\", function (err, data) {\n      if (err) {\n        console.error(\"Something went wrong:\", err);\n        return res.status(500).send(\"Oops, better luck next time!\");\n      }\n\n      return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(app, \"</div>\")));\n    });\n  });\n} else {\n  app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.static(\"./build\"));\n  app.get(\"/api\", function (req, res) {\n    try {\n      console.log(_dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a);\n      oracledb__WEBPACK_IMPORTED_MODULE_2___default.a.getConnection({\n        user: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.user,\n        password: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.password,\n        connectString: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.connectString\n      }).then(\n      /*#__PURE__*/\n      function () {\n        var _ref2 = _asyncToGenerator(\n        /*#__PURE__*/\n        regeneratorRuntime.mark(function _callee2(conn) {\n          var currentYearContractSumQuery, currentYearSpendAreasQuery, contractAwardedForYearsQuery, currentYearContractSum, currentYearSpendAreas, liabilitiesInSpendAreas, fecAwardedProjectsCurrentLiabilities, contractAwardedForYears, yearsContractSumVariousSpend;\n          return regeneratorRuntime.wrap(function _callee2$(_context2) {\n            while (1) {\n              switch (_context2.prev = _context2.next) {\n                case 0:\n                  console.log(conn);\n                  currentYearContractSumQuery = 'select contractSubType, count(contractSubType) from reports_vendor group by contractSubType';\n                  currentYearSpendAreasQuery = 'select contractSubType, paymentType, count(contractSubType) from reports_vendor group by contractSubType group by paymentType';\n                  contractAwardedForYearsQuery = 'select contractSubType, trunc(requestDate, \"Year\") from reports_vendor group by contractSubType group by trunc(requestDate, \"Year\")';\n                  _context2.next = 6;\n                  return conn.execute(currentYearContractSumQuery);\n\n                case 6:\n                  currentYearContractSum = _context2.sent;\n                  _context2.next = 9;\n                  return conn.execute(currentYearSpendAreasQuery);\n\n                case 9:\n                  currentYearSpendAreas = _context2.sent;\n                  liabilitiesInSpendAreas = [];\n                  fecAwardedProjectsCurrentLiabilities = [];\n                  _context2.next = 14;\n                  return conn.execute(contractAwardedForYearsQuery);\n\n                case 14:\n                  contractAwardedForYears = _context2.sent;\n                  yearsContractSumVariousSpend = [];\n                  res.json({\n                    currentYearContractSum: currentYearContractSum,\n                    currentYearSpendAreas: currentYearSpendAreas,\n                    liabilitiesInSpendAreas: liabilitiesInSpendAreas,\n                    fecAwardedProjectsCurrentLiabilities: fecAwardedProjectsCurrentLiabilities,\n                    contractAwardedForYears: contractAwardedForYears,\n                    yearsContractSumVariousSpend: yearsContractSumVariousSpend\n                  });\n\n                case 17:\n                case \"end\":\n                  return _context2.stop();\n              }\n            }\n          }, _callee2);\n        }));\n\n        return function (_x2) {\n          return _ref2.apply(this, arguments);\n        };\n      }()).catch(function (err) {\n        console.log(err);\n        res.status(500).json({\n          err: err\n        });\n      });\n    } catch (err) {\n      console.log(err);\n    }\n  });\n  app.get(\"/*\", function (req, res) {\n    var app = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_src_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 125\n      }\n    }));\n    var indexFile = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(\"./build/index.html\");\n    fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(indexFile, \"utf8\", function (err, data) {\n      if (err) {\n        console.error(\"Something went wrong:\", err);\n        return res.status(500).send(\"Oops, better luck next time!\");\n      }\n\n      return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(app, \"</div>\")));\n    });\n  });\n}\n\napp.listen(PORT, function () {\n  console.log(\"\\uD83D\\uDE0E Server is listening on port \".concat(PORT));\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var content = __webpack_require__(/*! !../node_modules/cra-universal/node_modules/css-loader!./App.css */ \"./node_modules/cra-universal/node_modules/css-loader/index.js!./src/App.css\");\n    var insertCss = __webpack_require__(/*! ../node_modules/isomorphic-style-loader/lib/insertCss.js */ \"./node_modules/isomorphic-style-loader/lib/insertCss.js\");\n\n    if (typeof content === 'string') {\n      content = [[module.i, content, '']];\n    }\n\n    module.exports = content.locals || {};\n    module.exports._getContent = function() { return content; };\n    module.exports._getCss = function() { return content.toString(); };\n    module.exports._insertCss = function(options) { return insertCss(content, options) };\n    \n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if ( true && typeof window !== 'undefined' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(/*! !../node_modules/cra-universal/node_modules/css-loader!./App.css */ \"./node_modules/cra-universal/node_modules/css-loader/index.js!./src/App.css\", function() {\n        content = __webpack_require__(/*! !../node_modules/cra-universal/node_modules/css-loader!./App.css */ \"./node_modules/cra-universal/node_modules/css-loader/index.js!./src/App.css\");\n\n        if (typeof content === 'string') {\n          content = [[module.i, content, '']];\n        }\n\n        removeCss = insertCss(content, { replace: true });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  \n\n//# sourceURL=webpack:///./src/App.css?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.css */ \"./src/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_chartkick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-chartkick */ \"react-chartkick\");\n/* harmony import */ var react_chartkick__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_chartkick__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chart.js */ \"chart.js\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"C:\\\\Users\\\\T540P\\\\Desktop\\\\projects\\\\2019\\\\firs_report\\\\v-report\\\\src\\\\App.js\";\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nreact_chartkick__WEBPACK_IMPORTED_MODULE_3___default.a.addAdapter(chart_js__WEBPACK_IMPORTED_MODULE_4___default.a);\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, App);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_this), \"state\", {\n      processData: [{\n        requestedAmount: 3872368.42,\n        requestDate: '23/JAN/2019',\n        dueDate: '1/FEB/2019',\n        dayPastDue: 12,\n        explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'\n      }, {\n        requestedAmount: 31218749.41,\n        requestDate: '29/JAN/2019',\n        dueDate: '9/FEB/2019',\n        dayPastDue: 13,\n        explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'\n      }, {\n        requestedAmount: 3872368.42,\n        requestDate: '18/FEB/2019',\n        dueDate: '12/FEB/2019',\n        dayPastDue: 30,\n        explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'\n      }, {\n        requestedAmount: 3872368.42,\n        requestDate: '12/MAR/2019',\n        dueDate: '28/FEB/2019',\n        dayPastDue: 21,\n        explanation: 'D/F&A 06/2/2019 Overhead at 11/2/2019'\n      }],\n      currentYearContractSum: [[\"Works\", 16], [\"Services\", 45], [\"Goods\", 26], [\"SPD\", 7], [\"Job Order (General)\", 3], [\"Job Order (Motors)\", 3]],\n      currentYearSpendAreas: [{\n        name: \"Total Awards\",\n        data: {\n          \"Job Order (Motor Vehicle)\": 968,\n          \"Job Order (General)\": 786,\n          \"SPD\": 136,\n          \"Goods\": 135,\n          \"Services\": 783,\n          \"Works\": 37\n        }\n      }, {\n        name: \"Total Completed\",\n        data: {\n          \"Job Order (Motor Vehicle)\": 364,\n          \"Job Order (General)\": 480,\n          \"SPD\": 118,\n          \"Goods\": 91,\n          \"Services\": 109,\n          \"Works\": 16\n        }\n      }, {\n        name: \"Ongoing\",\n        data: {\n          \"Job Order (Motor Vehicle)\": 604,\n          \"Job Order (General)\": 303,\n          \"SPD\": 18,\n          \"Goods\": 44,\n          \"Services\": 674,\n          \"Works\": 21\n        }\n      }],\n      liabilitiesInSpendAreas: [],\n      fecAwardedProjectsCurrentLiabilities: [],\n      contractAwardedForYears: [{\n        name: \"2016\",\n        data: {\n          \"Job Order (Motor Vehicle)\": 968,\n          \"Job Order (General)\": 786,\n          \"SPD\": 136,\n          \"Goods\": 135,\n          \"Services\": 783,\n          \"Works\": 37\n        }\n      }, {\n        name: \"2017\",\n        data: {\n          \"Job Order (Motor Vehicle)\": 364,\n          \"Job Order (General)\": 480,\n          \"SPD\": 118,\n          \"Goods\": 91,\n          \"Services\": 109,\n          \"Works\": 16\n        }\n      }, {\n        name: \"2018\",\n        data: {\n          \"Job Order (Motor Vehicle)\": 604,\n          \"Job Order (General)\": 303,\n          \"SPD\": 18,\n          \"Goods\": 44,\n          \"Services\": 674,\n          \"Works\": 21\n        }\n      }],\n      yearsContractSumVariousSpend: [{\n        name: \"Job Order (Motor Vehicle)\",\n        data: {\n          \"2016\": 968,\n          \"2017\": 786,\n          \"2018\": 136\n        }\n      }, {\n        name: \"Job Order (General)\",\n        data: {\n          \"2016\": 364,\n          \"2017\": 480,\n          \"2018\": 118\n        }\n      }, {\n        name: \"SPD\",\n        data: {\n          \"2016\": 968,\n          \"2017\": 786,\n          \"2018\": 136\n        }\n      }, {\n        name: \"Goods\",\n        data: {\n          \"2016\": 968,\n          \"2017\": 786,\n          \"2018\": 136\n        }\n      }, {\n        name: \"Services\",\n        data: {\n          \"2016\": 968,\n          \"2017\": 786,\n          \"2018\": 136\n        }\n      }, {\n        name: \"Works\",\n        data: {\n          \"2016\": 968,\n          \"2017\": 786,\n          \"2018\": 136\n        }\n      }]\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"changeSort\", function (sort) {\n      var processData = _this.state.processData;\n\n      switch (sort) {\n        case 'IPC Sum desc':\n          processData.sort(function (a, b) {\n            if (a.requestedAmount > b.requestedAmount) {\n              return -1;\n            } else if (a.requestedAmount < b.requestedAmount) {\n              return 1;\n            } else {\n              return 0;\n            }\n          });\n          break;\n\n        case 'IPC Sum asc':\n          processData.sort(function (a, b) {\n            if (a.requestedAmount > b.requestedAmount) {\n              return 1;\n            } else if (a.requestedAmount < b.requestedAmount) {\n              return -1;\n            } else {\n              return 0;\n            }\n          });\n          break;\n\n        case 'Date raised desc':\n          processData.sort(function (a, b) {\n            if (new Date(a.requestDate) > new Date(b.requestDate)) {\n              return -1;\n            } else if (new Date(a.requestDate) < new Date(b.requestDate)) {\n              return 1;\n            } else {\n              return 0;\n            }\n          });\n          break;\n\n        case 'Date raised asc':\n          processData.sort(function (a, b) {\n            if (new Date(a.requestDate) > new Date(b.requestDate)) {\n              return 1;\n            } else if (new Date(a.requestDate) < new Date(b.requestDate)) {\n              return -1;\n            } else {\n              return 0;\n            }\n          });\n          break;\n\n        case 'Due Date desc':\n          processData.sort(function (a, b) {\n            if (new Date(a.dueDate) > new Date(b.dueDate)) {\n              return -1;\n            } else if (new Date(a.dueDate) < new Date(b.dueDate)) {\n              return 1;\n            } else {\n              return 0;\n            }\n          });\n          break;\n\n        case 'Due Date asc':\n          processData.sort(function (a, b) {\n            if (new Date(a.dueDate) > new Date(b.dueDate)) {\n              return 1;\n            } else if (new Date(a.dueDate) < new Date(b.dueDate)) {\n              return -1;\n            } else {\n              return 0;\n            }\n          });\n          break;\n\n        default:\n          processData.sort(function (a, b) {\n            if (new Date(a.dayPastDue) > new Date(b.dayPastDue)) {\n              return -1;\n            } else if (new Date(a.dayPastDue) < new Date(b.dayPastDue)) {\n              return 1;\n            } else {\n              return 0;\n            }\n          });\n      }\n\n      _this.setState({\n        processData: processData\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"renderTableReport\", function () {\n      return _this.state.processData.map(function (data, index) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", {\n          key: index,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 293\n          }\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 294\n          }\n        }, index + 1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 295\n          }\n        }, \"N \", data.requestedAmount), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 296\n          }\n        }, data.requestDate), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 297\n          }\n        }, data.dueDate), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 298\n          }\n        }, data.dayPastDue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 299\n          }\n        }, data.explanation));\n      });\n    });\n\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api').then(function (result) {\n        console.log(result);\n      }).catch(function (err) {\n        console.log(err.response);\n      });\n      var processData = this.state.processData;\n      processData.sort(function (a, b) {\n        if (a.dayPastDue > b.dayPastDue) {\n          return -1;\n        } else if (a.dayPastDue < b.dayPastDue) {\n          return 1;\n        } else {\n          return 0;\n        }\n      });\n      this.setState({\n        processData: processData\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$state = this.state,\n          currentYearContractSum = _this$state.currentYearContractSum,\n          currentYearSpendAreas = _this$state.currentYearSpendAreas,\n          contractAwardedForYears = _this$state.contractAwardedForYears,\n          yearsContractSumVariousSpend = _this$state.yearsContractSumVariousSpend;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"chartPage\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 311\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 313\n        }\n      }, \"Graphic Analysis of 2018 FIRS Procurement Data\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n        className: \"hero\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 314\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"article\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 315\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 316\n        }\n      }, \"2018 Procurement Award by Contract Sum\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartkick__WEBPACK_IMPORTED_MODULE_3__[\"PieChart\"], {\n        data: currentYearContractSum,\n        suffix: \"%\",\n        legend: \"right\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 317\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"article\", {\n        className: \"chart\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 328\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 329\n        }\n      }, \"2018 Award in various spend areas\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartkick__WEBPACK_IMPORTED_MODULE_3__[\"BarChart\"], {\n        data: currentYearSpendAreas,\n        height: 300,\n        legend: \"bottom\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 330\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"article\", {\n        className: \"chart\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 338\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 339\n        }\n      }, \"Contract Awarded for Years 2016, 2017, 2018\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartkick__WEBPACK_IMPORTED_MODULE_3__[\"ColumnChart\"], {\n        data: contractAwardedForYears,\n        height: 300,\n        legend: \"bottom\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 340\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"article\", {\n        className: \"chart\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 349\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 350\n        }\n      }, \"Total Contract Sum with various spend areas for year 2016, 2017, 2018\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartkick__WEBPACK_IMPORTED_MODULE_3__[\"BarChart\"], {\n        data: yearsContractSumVariousSpend,\n        height: 300,\n        legend: \"bottom\",\n        prefix: \"N\",\n        suffix: \".00\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 351\n        }\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 365\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"text-right\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 366\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        onChange: function onChange(e) {\n          return _this2.changeSort(e.target.value);\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 367\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 368\n        }\n      }, \"IPC Sum desc\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 369\n        }\n      }, \"IPC Sum asc\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 370\n        }\n      }, \"Date raised desc\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 371\n        }\n      }, \"Date raised asc\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 372\n        }\n      }, \"Due Date desc\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 373\n        }\n      }, \"Due Date asc\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"table\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 376\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"thead\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 377\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 378\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 379\n        }\n      }, \"S/No\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 380\n        }\n      }, \"IPC Sum\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 381\n        }\n      }, \"Date Requested\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 382\n        }\n      }, \"Due Date for Payment\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 383\n        }\n      }, \"Days Past Due\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 384\n        }\n      }, \"Explanation\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tbody\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 387\n        }\n      }, this.renderTableReport()))));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ 0:
/*!********************************************************************************************************************************************************************!*\
  !*** multi ./server/index.js !./node_modules/start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/start-server-webpack-plugin/dist/monitor-loader.js ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./server/index.js */\"./server/index.js\");\nmodule.exports = __webpack_require__(/*! !!C:\\Users\\T540P\\Desktop\\projects\\2019\\firs_report\\v-report\\node_modules\\start-server-webpack-plugin\\dist\\monitor-loader.js!C:\\Users\\T540P\\Desktop\\projects\\2019\\firs_report\\v-report\\node_modules\\start-server-webpack-plugin\\dist\\monitor-loader.js */\"./node_modules/start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/start-server-webpack-plugin/dist/monitor-loader.js\");\n\n\n//# sourceURL=webpack:///./node_modules/start-server-webpack-plugin/dist/monitor-loader.js?multi_./server/index.js_!./node_modules/start-server-webpack-plugin/dist/monitor-loader.js");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/json/stringify\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/json/stringify%22?");

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/slicedToArray\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/helpers/slicedToArray%22?");

/***/ }),

/***/ "chart.js":
/*!***************************!*\
  !*** external "chart.js" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chart.js\");\n\n//# sourceURL=webpack:///external_%22chart.js%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "oracledb":
/*!***************************!*\
  !*** external "oracledb" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"oracledb\");\n\n//# sourceURL=webpack:///external_%22oracledb%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-chartkick":
/*!**********************************!*\
  !*** external "react-chartkick" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-chartkick\");\n\n//# sourceURL=webpack:///external_%22react-chartkick%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "webpack/hot/log-apply-result":
/*!***********************************************!*\
  !*** external "webpack/hot/log-apply-result" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack/hot/log-apply-result\");\n\n//# sourceURL=webpack:///external_%22webpack/hot/log-apply-result%22?");

/***/ })

/******/ });