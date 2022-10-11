import { createRequire } from "module";
import * as crypto_star from "crypto";
import * as events_star from "events";
import * as stream_star from "stream";
import * as https_star from "https";
import * as http_star from "http";
import * as net_star from "net";
import * as tls_star from "tls";
import * as url_star from "url";
import * as zlib_star from "zlib";
import * as util_star from "util";
const require2 = createRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require2 !== "undefined" ? require2 : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require2 !== "undefined" ? require2 : a)[b]
}) : x)(function(x) {
  if (typeof require2 !== "undefined")
    return require2.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_traversal = __commonJS({
  "node_modules/gremlin/lib/process/traversal.js"(exports, module) {
    var itemDone = Object.freeze({ value: null, done: true });
    var asyncIteratorSymbol = Symbol.asyncIterator || Symbol("@@asyncIterator");
    var Traversal = class {
      constructor(graph, traversalStrategies, bytecode) {
        this.graph = graph;
        this.traversalStrategies = traversalStrategies;
        this.bytecode = bytecode;
        this.traversers = null;
        this.sideEffects = null;
        this._traversalStrategiesPromise = null;
        this._traversersIteratorIndex = 0;
      }
      [asyncIteratorSymbol]() {
        return this;
      }
      getBytecode() {
        return this.bytecode;
      }
      toList() {
        return this._applyStrategies().then(() => {
          const result = [];
          let it;
          while ((it = this._getNext()) && !it.done) {
            result.push(it.value);
          }
          return result;
        });
      }
      hasNext() {
        return this._applyStrategies().then(
          () => this.traversers && this.traversers.length > 0 && this._traversersIteratorIndex < this.traversers.length && this.traversers[this._traversersIteratorIndex].bulk > 0
        );
      }
      iterate() {
        this.bytecode.addStep("none");
        return this._applyStrategies().then(() => {
          let it;
          while ((it = this._getNext()) && !it.done) {
          }
        });
      }
      next() {
        return this._applyStrategies().then(() => this._getNext());
      }
      _getNext() {
        while (this.traversers && this._traversersIteratorIndex < this.traversers.length) {
          const traverser = this.traversers[this._traversersIteratorIndex];
          if (traverser.bulk > 0) {
            traverser.bulk--;
            return { value: traverser.object, done: false };
          }
          this._traversersIteratorIndex++;
        }
        return itemDone;
      }
      _applyStrategies() {
        if (this._traversalStrategiesPromise) {
          return this._traversalStrategiesPromise;
        }
        return this._traversalStrategiesPromise = this.traversalStrategies.applyStrategies(this);
      }
      toJSON() {
        return this.bytecode.stepInstructions;
      }
      toString() {
        return this.bytecode.toString();
      }
    };
    var IO = class {
      static get graphml() {
        return "graphml";
      }
      static get graphson() {
        return "graphson";
      }
      static get gryo() {
        return "gryo";
      }
      static get reader() {
        return "~tinkerpop.io.reader";
      }
      static get registry() {
        return "~tinkerpop.io.registry";
      }
      static get writer() {
        return "~tinkerpop.io.writer";
      }
    };
    var P = class {
      constructor(operator, value, other) {
        this.operator = operator;
        this.value = value;
        this.other = other;
      }
      toString() {
        function formatValue(value) {
          if (Array.isArray(value)) {
            const acc = [];
            for (const item of value) {
              acc.push(formatValue(item));
            }
            return acc;
          }
          if (value && typeof value === "string") {
            return `'${value}'`;
          }
          return value;
        }
        if (this.other === void 0 || this.other === null) {
          return this.operator + "(" + formatValue(this.value) + ")";
        }
        return this.operator + "(" + formatValue(this.value) + ", " + formatValue(this.other) + ")";
      }
      and(arg) {
        return new P("and", this, arg);
      }
      or(arg) {
        return new P("or", this, arg);
      }
      static within(...args) {
        if (args.length === 1 && Array.isArray(args[0])) {
          return new P("within", args[0], null);
        }
        return new P("within", args, null);
      }
      static without(...args) {
        if (args.length === 1 && Array.isArray(args[0])) {
          return new P("without", args[0], null);
        }
        return new P("without", args, null);
      }
      static between(...args) {
        return createP("between", args);
      }
      static eq(...args) {
        return createP("eq", args);
      }
      static gt(...args) {
        return createP("gt", args);
      }
      static gte(...args) {
        return createP("gte", args);
      }
      static inside(...args) {
        return createP("inside", args);
      }
      static lt(...args) {
        return createP("lt", args);
      }
      static lte(...args) {
        return createP("lte", args);
      }
      static neq(...args) {
        return createP("neq", args);
      }
      static not(...args) {
        return createP("not", args);
      }
      static outside(...args) {
        return createP("outside", args);
      }
      static test(...args) {
        return createP("test", args);
      }
    };
    function createP(operator, args) {
      args.unshift(null, operator);
      return new (Function.prototype.bind.apply(P, args))();
    }
    var TextP = class {
      constructor(operator, value, other) {
        this.operator = operator;
        this.value = value;
        this.other = other;
      }
      toString() {
        function formatValue(value) {
          if (value && typeof value === "string") {
            return `'${value}'`;
          }
          return value;
        }
        if (this.other === void 0) {
          return this.operator + "(" + formatValue(this.value) + ")";
        }
        return this.operator + "(" + formatValue(this.value) + ", " + formatValue(this.other) + ")";
      }
      and(arg) {
        return new P("and", this, arg);
      }
      or(arg) {
        return new P("or", this, arg);
      }
      static containing(...args) {
        return createTextP("containing", args);
      }
      static endingWith(...args) {
        return createTextP("endingWith", args);
      }
      static notContaining(...args) {
        return createTextP("notContaining", args);
      }
      static notEndingWith(...args) {
        return createTextP("notEndingWith", args);
      }
      static notStartingWith(...args) {
        return createTextP("notStartingWith", args);
      }
      static startingWith(...args) {
        return createTextP("startingWith", args);
      }
      static regex(...args) {
        return createTextP("regex", args);
      }
      static notRegex(...args) {
        return createTextP("notRegex", args);
      }
    };
    function createTextP(operator, args) {
      args.unshift(null, operator);
      return new (Function.prototype.bind.apply(TextP, args))();
    }
    var Traverser = class {
      constructor(object, bulk) {
        this.object = object;
        this.bulk = bulk || 1;
      }
    };
    var TraversalSideEffects = class {
    };
    var withOptions = {
      tokens: "~tinkerpop.valueMap.tokens",
      none: 0,
      ids: 1,
      labels: 2,
      keys: 4,
      values: 8,
      all: 15,
      indexer: "~tinkerpop.index.indexer",
      list: 0,
      map: 1
    };
    function toEnum(typeName, keys) {
      const result = {};
      keys.split(" ").forEach((k) => {
        let jsKey = k;
        if (jsKey === jsKey.toUpperCase()) {
          jsKey = jsKey.toLowerCase();
        }
        result[jsKey] = new EnumValue(typeName, k);
      });
      return result;
    }
    var EnumValue = class {
      constructor(typeName, elementName) {
        this.typeName = typeName;
        this.elementName = elementName;
      }
      toString() {
        return this.elementName;
      }
    };
    module.exports = {
      EnumValue,
      P,
      TextP,
      withOptions,
      IO,
      Traversal,
      TraversalSideEffects,
      Traverser,
      barrier: toEnum("Barrier", "normSack"),
      cardinality: toEnum("Cardinality", "list set single"),
      column: toEnum("Column", "keys values"),
      direction: toEnum("Direction", "BOTH IN OUT from_ to"),
      graphSONVersion: toEnum("GraphSONVersion", "V1_0 V2_0 V3_0"),
      gryoVersion: toEnum("GryoVersion", "V1_0 V3_0"),
      merge: toEnum("Merge", "onCreate onMatch"),
      operator: toEnum("Operator", "addAll and assign div max min minus mult or sum sumLong"),
      order: toEnum("Order", "asc desc shuffle"),
      pick: toEnum("Pick", "any none"),
      pop: toEnum("Pop", "all first last mixed"),
      scope: toEnum("Scope", "global local"),
      t: toEnum("T", "id key label value")
    };
  }
});
var require_traversal_strategy = __commonJS({
  "node_modules/gremlin/lib/process/traversal-strategy.js"(exports, module) {
    var Traversal = require_traversal().Traversal;
    var TraversalStrategies = class {
      constructor(parent) {
        if (parent) {
          this.strategies = [...parent.strategies];
        } else {
          this.strategies = [];
        }
      }
      addStrategy(strategy) {
        this.strategies.push(strategy);
      }
      removeStrategy(strategy) {
        const idx = this.strategies.findIndex((s) => s.fqcn === strategy.fqcn);
        if (idx !== -1) {
          return this.strategies.splice(idx, 1)[0];
        }
        return void 0;
      }
      applyStrategies(traversal) {
        return this.strategies.reduce(
          (promise, strategy) => promise.then(() => strategy.apply(traversal)),
          Promise.resolve()
        );
      }
    };
    var TraversalStrategy = class {
      constructor(fqcn, configuration = {}) {
        this.fqcn = fqcn;
        this.configuration = configuration;
      }
      apply(traversal) {
      }
    };
    var ConnectiveStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.ConnectiveStrategy");
      }
    };
    var ElementIdStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.ElementIdStrategy");
      }
    };
    var HaltedTraverserStrategy = class extends TraversalStrategy {
      constructor(haltedTraverserFactory) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.HaltedTraverserStrategy");
        if (haltedTraverserFactory !== void 0) {
          this.configuration["haltedTraverserFactory"] = haltedTraverserFactory;
        }
      }
    };
    var OptionsStrategy = class extends TraversalStrategy {
      constructor(options) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.OptionsStrategy", options);
      }
    };
    var PartitionStrategy = class extends TraversalStrategy {
      constructor(options) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.PartitionStrategy", options);
      }
    };
    var SubgraphStrategy = class extends TraversalStrategy {
      constructor(options) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.SubgraphStrategy", options);
        if (this.configuration.vertices instanceof Traversal) {
          this.configuration.vertices = this.configuration.vertices.bytecode;
        }
        if (this.configuration.edges instanceof Traversal) {
          this.configuration.edges = this.configuration.edges.bytecode;
        }
        if (this.configuration.vertexProperties instanceof Traversal) {
          this.configuration.vertexProperties = this.configuration.vertexProperties.bytecode;
        }
      }
    };
    var ProductiveByStrategy = class extends TraversalStrategy {
      constructor(options) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.ProductiveByStrategy", options);
      }
    };
    var VertexProgramStrategy = class extends TraversalStrategy {
      constructor(options) {
        super("org.apache.tinkerpop.gremlin.process.computer.traversal.strategy.decoration.VertexProgramStrategy", options);
      }
    };
    var MatchAlgorithmStrategy = class extends TraversalStrategy {
      constructor(matchAlgorithm) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.finalization.MatchAlgorithmStrategy");
        if (matchAlgorithm !== void 0) {
          this.configuration["matchAlgorithm"] = matchAlgorithm;
        }
      }
    };
    var AdjacentToIncidentStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.AdjacentToIncidentStrategy");
      }
    };
    var FilterRankingStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.FilterRankingStrategy");
      }
    };
    var IdentityRemovalStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.IdentityRemovalStrategy");
      }
    };
    var IncidentToAdjacentStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.IncidentToAdjacentStrategy");
      }
    };
    var InlineFilterStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.InlineFilterStrategy");
      }
    };
    var LazyBarrierStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.LazyBarrierStrategy");
      }
    };
    var MatchPredicateStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.MatchPredicateStrategy");
      }
    };
    var OrderLimitStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.OrderLimitStrategy");
      }
    };
    var PathProcessorStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.PathProcessorStrategy");
      }
    };
    var PathRetractionStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.PathRetractionStrategy");
      }
    };
    var CountStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.CountStrategy");
      }
    };
    var RepeatUnrollStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.RepeatUnrollStrategy");
      }
    };
    var GraphFilterStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.GraphFilterStrategy");
      }
    };
    var EarlyLimitStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.optimization.EarlyLimitStrategy");
      }
    };
    var LambdaRestrictionStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.verification.LambdaRestrictionStrategy");
      }
    };
    var ReadOnlyStrategy = class extends TraversalStrategy {
      constructor() {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.verification.ReadOnlyStrategy");
      }
    };
    var EdgeLabelVerificationStrategy = class extends TraversalStrategy {
      constructor(logWarnings = false, throwException = false) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.verification.EdgeLabelVerificationStrategy", {
          logWarnings,
          throwException
        });
      }
    };
    var ReservedKeysVerificationStrategy = class extends TraversalStrategy {
      constructor(logWarnings = false, throwException = false, keys = ["id", "label"]) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.verification.ReservedKeysVerificationStrategy", {
          logWarnings,
          throwException,
          keys
        });
      }
    };
    var SeedStrategy = class extends TraversalStrategy {
      constructor(options) {
        super("org.apache.tinkerpop.gremlin.process.traversal.strategy.decoration.SeedStrategy", {
          seed: options.seed
        });
      }
    };
    module.exports = {
      TraversalStrategies,
      TraversalStrategy,
      ConnectiveStrategy,
      ElementIdStrategy,
      HaltedTraverserStrategy,
      OptionsStrategy,
      PartitionStrategy,
      SeedStrategy,
      SubgraphStrategy,
      VertexProgramStrategy,
      MatchAlgorithmStrategy,
      AdjacentToIncidentStrategy,
      FilterRankingStrategy,
      IdentityRemovalStrategy,
      IncidentToAdjacentStrategy,
      InlineFilterStrategy,
      LazyBarrierStrategy,
      MatchPredicateStrategy,
      OrderLimitStrategy,
      PathProcessorStrategy,
      PathRetractionStrategy,
      ProductiveByStrategy,
      CountStrategy,
      RepeatUnrollStrategy,
      GraphFilterStrategy,
      EarlyLimitStrategy,
      EdgeLabelVerificationStrategy,
      LambdaRestrictionStrategy,
      ReadOnlyStrategy,
      ReservedKeysVerificationStrategy
    };
  }
});
var require_remote_connection = __commonJS({
  "node_modules/gremlin/lib/driver/remote-connection.js"(exports, module) {
    var t = require_traversal();
    var TraversalStrategy = require_traversal_strategy().TraversalStrategy;
    var RemoteConnection = class {
      constructor(url, options = {}) {
        this.url = url;
        this.options = options;
      }
      open() {
        throw new Error("open() must be implemented");
      }
      get isOpen() {
        throw new Error("isOpen() must be implemented");
      }
      get isSessionBound() {
        return false;
      }
      submit(bytecode) {
        throw new Error("submit() must be implemented");
      }
      createSession() {
        throw new Error("createSession() must be implemented");
      }
      commit() {
        throw new Error("commit() must be implemented");
      }
      rollback() {
        throw new Error("rollback() must be implemented");
      }
      close() {
        throw new Error("close() must be implemented");
      }
    };
    var RemoteTraversal = class extends t.Traversal {
      constructor(traversers, sideEffects) {
        super(null, null, null);
        this.traversers = traversers;
        this.sideEffects = sideEffects;
      }
    };
    var RemoteStrategy = class extends TraversalStrategy {
      constructor(connection) {
        super("js:RemoteStrategy");
        this.connection = connection;
      }
      apply(traversal) {
        if (traversal.traversers) {
          return Promise.resolve();
        }
        return this.connection.submit(traversal.getBytecode()).then(function(remoteTraversal) {
          traversal.sideEffects = remoteTraversal.sideEffects;
          traversal.traversers = remoteTraversal.traversers;
        });
      }
    };
    module.exports = { RemoteConnection, RemoteStrategy, RemoteTraversal };
  }
});
var require_bytecode = __commonJS({
  "node_modules/gremlin/lib/process/bytecode.js"(exports, module) {
    var { Traversal } = require_traversal();
    var Bytecode = class {
      constructor(toClone) {
        if (!toClone) {
          this.sourceInstructions = [];
          this.stepInstructions = [];
        } else {
          this.sourceInstructions = [...toClone.sourceInstructions];
          this.stepInstructions = [...toClone.stepInstructions];
        }
      }
      addSource(name, values) {
        if (name === void 0) {
          throw new Error("Name is not defined");
        }
        const instruction = new Array(values.length + 1);
        instruction[0] = name;
        for (let i = 0; i < values.length; ++i) {
          instruction[i + 1] = values[i];
        }
        this.sourceInstructions.push(Bytecode._generateInstruction(name, values));
        return this;
      }
      addStep(name, values) {
        if (name === void 0) {
          throw new Error("Name is not defined");
        }
        this.stepInstructions.push(Bytecode._generateInstruction(name, values));
        return this;
      }
      static _generateInstruction(name, values) {
        const length = (values ? values.length : 0) + 1;
        const instruction = new Array(length);
        instruction[0] = name;
        for (let i = 1; i < length; i++) {
          const val = values[i - 1];
          if (val instanceof Traversal && val.graph != null) {
            throw new Error(
              `The child traversal of ${val} was not spawned anonymously - use the __ class rather than a TraversalSource to construct the child traversal`
            );
          }
          instruction[i] = val;
        }
        return instruction;
      }
      toString() {
        return JSON.stringify([this.sourceInstructions, this.stepInstructions]);
      }
      static _createGraphOp(name, values) {
        const bc = new Bytecode();
        bc.addSource(name, values);
        return bc;
      }
      static get GraphOp() {
        return {
          commit: Bytecode._createGraphOp("tx", ["commit"]),
          rollback: Bytecode._createGraphOp("tx", ["rollback"])
        };
      }
    };
    module.exports = Bytecode;
  }
});
var require_transaction = __commonJS({
  "node_modules/gremlin/lib/process/transaction.js"(exports, module) {
    var remote = require_remote_connection();
    var Bytecode = require_bytecode();
    var { TraversalStrategies } = require_traversal_strategy();
    var Transaction = class {
      constructor(g) {
        this._g = g;
        this._sessionBasedConnection = void 0;
      }
      begin() {
        if (this._sessionBasedConnection) {
          throw new Error("Transaction already started on this object");
        }
        this._sessionBasedConnection = this._g.remoteConnection.createSession();
        const traversalStrategy = new TraversalStrategies();
        traversalStrategy.addStrategy(new remote.RemoteStrategy(this._sessionBasedConnection));
        return new this._g.graphTraversalSourceClass(
          this._g.graph,
          traversalStrategy,
          new Bytecode(this._g.bytecode),
          this._g.graphTraversalSourceClass,
          this._g.graphTraversalClass
        );
      }
      commit() {
        return this._sessionBasedConnection.commit().then(() => this.close());
      }
      rollback() {
        return this._sessionBasedConnection.rollback().then(() => this.close());
      }
      get isOpen() {
        return this._sessionBasedConnection.isOpen;
      }
      close() {
        if (this._sessionBasedConnection) {
          this._sessionBasedConnection.close();
        }
      }
    };
    module.exports = {
      Transaction
    };
  }
});
var require_graph_traversal = __commonJS({
  "node_modules/gremlin/lib/process/graph-traversal.js"(exports, module) {
    var { Traversal } = require_traversal();
    var { Transaction } = require_transaction();
    var remote = require_remote_connection();
    var Bytecode = require_bytecode();
    var { TraversalStrategies, VertexProgramStrategy, OptionsStrategy } = require_traversal_strategy();
    var GraphTraversalSource = class {
      constructor(graph, traversalStrategies, bytecode, graphTraversalSourceClass, graphTraversalClass) {
        this.graph = graph;
        this.traversalStrategies = traversalStrategies;
        this.bytecode = bytecode || new Bytecode();
        this.graphTraversalSourceClass = graphTraversalSourceClass || GraphTraversalSource;
        this.graphTraversalClass = graphTraversalClass || GraphTraversal;
        const strat = traversalStrategies.strategies.find((ts) => ts.fqcn === "js:RemoteStrategy");
        this.remoteConnection = strat !== void 0 ? strat.connection : void 0;
      }
      withRemote(remoteConnection) {
        const traversalStrategy = new TraversalStrategies(this.traversalStrategies);
        traversalStrategy.addStrategy(new remote.RemoteStrategy(remoteConnection));
        return new this.graphTraversalSourceClass(
          this.graph,
          traversalStrategy,
          new Bytecode(this.bytecode),
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      tx() {
        if (this.remoteConnection && this.remoteConnection.isSessionBound) {
          throw new Error("This TraversalSource is already bound to a transaction - child transactions are not supported");
        }
        return new Transaction(this);
      }
      withComputer(graphComputer, workers, result, persist, vertices, edges, configuration) {
        const m = {};
        if (graphComputer !== void 0) {
          m.graphComputer = graphComputer;
        }
        if (workers !== void 0) {
          m.workers = workers;
        }
        if (result !== void 0) {
          m.result = result;
        }
        if (persist !== void 0) {
          m.graphComputer = persist;
        }
        if (vertices !== void 0) {
          m.vertices = vertices;
        }
        if (edges !== void 0) {
          m.edges = edges;
        }
        if (configuration !== void 0) {
          m.configuration = configuration;
        }
        return this.withStrategies(new VertexProgramStrategy(m));
      }
      with_(key, value = void 0) {
        const val = value === void 0 ? true : value;
        let optionsStrategy = this.bytecode.sourceInstructions.find(
          (i) => i[0] === "withStrategies" && i[1] instanceof OptionsStrategy
        );
        if (optionsStrategy === void 0) {
          optionsStrategy = new OptionsStrategy({ [key]: val });
          return this.withStrategies(optionsStrategy);
        }
        optionsStrategy[1].configuration[key] = val;
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          this.bytecode,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      toString() {
        return "graphtraversalsource[" + this.graph.toString() + "]";
      }
      withBulk(...args) {
        const b = new Bytecode(this.bytecode).addSource("withBulk", args);
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          b,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      withPath(...args) {
        const b = new Bytecode(this.bytecode).addSource("withPath", args);
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          b,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      withSack(...args) {
        const b = new Bytecode(this.bytecode).addSource("withSack", args);
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          b,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      withSideEffect(...args) {
        const b = new Bytecode(this.bytecode).addSource("withSideEffect", args);
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          b,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      withStrategies(...args) {
        const b = new Bytecode(this.bytecode).addSource("withStrategies", args);
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          b,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      withoutStrategies(...args) {
        const b = new Bytecode(this.bytecode).addSource("withoutStrategies", args);
        return new this.graphTraversalSourceClass(
          this.graph,
          new TraversalStrategies(this.traversalStrategies),
          b,
          this.graphTraversalSourceClass,
          this.graphTraversalClass
        );
      }
      E(...args) {
        const b = new Bytecode(this.bytecode).addStep("E", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      V(...args) {
        const b = new Bytecode(this.bytecode).addStep("V", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      addE(...args) {
        const b = new Bytecode(this.bytecode).addStep("addE", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      mergeE(...args) {
        const b = new Bytecode(this.bytecode).addStep("mergeE", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      addV(...args) {
        const b = new Bytecode(this.bytecode).addStep("addV", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      mergeV(...args) {
        const b = new Bytecode(this.bytecode).addStep("mergeV", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      inject(...args) {
        const b = new Bytecode(this.bytecode).addStep("inject", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      io(...args) {
        const b = new Bytecode(this.bytecode).addStep("io", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
      call(...args) {
        const b = new Bytecode(this.bytecode).addStep("call", args);
        return new this.graphTraversalClass(this.graph, new TraversalStrategies(this.traversalStrategies), b);
      }
    };
    var GraphTraversal = class extends Traversal {
      constructor(graph, traversalStrategies, bytecode) {
        super(graph, traversalStrategies, bytecode);
      }
      clone() {
        return new GraphTraversal(this.graph, this.traversalStrategies, this.getBytecode());
      }
      V(...args) {
        this.bytecode.addStep("V", args);
        return this;
      }
      addE(...args) {
        this.bytecode.addStep("addE", args);
        return this;
      }
      addV(...args) {
        this.bytecode.addStep("addV", args);
        return this;
      }
      aggregate(...args) {
        this.bytecode.addStep("aggregate", args);
        return this;
      }
      and(...args) {
        this.bytecode.addStep("and", args);
        return this;
      }
      as(...args) {
        this.bytecode.addStep("as", args);
        return this;
      }
      barrier(...args) {
        this.bytecode.addStep("barrier", args);
        return this;
      }
      both(...args) {
        this.bytecode.addStep("both", args);
        return this;
      }
      bothE(...args) {
        this.bytecode.addStep("bothE", args);
        return this;
      }
      bothV(...args) {
        this.bytecode.addStep("bothV", args);
        return this;
      }
      branch(...args) {
        this.bytecode.addStep("branch", args);
        return this;
      }
      by(...args) {
        this.bytecode.addStep("by", args);
        return this;
      }
      call(...args) {
        this.bytecode.addStep("call", args);
        return this;
      }
      cap(...args) {
        this.bytecode.addStep("cap", args);
        return this;
      }
      choose(...args) {
        this.bytecode.addStep("choose", args);
        return this;
      }
      coalesce(...args) {
        this.bytecode.addStep("coalesce", args);
        return this;
      }
      coin(...args) {
        this.bytecode.addStep("coin", args);
        return this;
      }
      connectedComponent(...args) {
        this.bytecode.addStep("connectedComponent", args);
        return this;
      }
      constant(...args) {
        this.bytecode.addStep("constant", args);
        return this;
      }
      count(...args) {
        this.bytecode.addStep("count", args);
        return this;
      }
      cyclicPath(...args) {
        this.bytecode.addStep("cyclicPath", args);
        return this;
      }
      dedup(...args) {
        this.bytecode.addStep("dedup", args);
        return this;
      }
      drop(...args) {
        this.bytecode.addStep("drop", args);
        return this;
      }
      element(...args) {
        this.bytecode.addStep("element", args);
        return this;
      }
      elementMap(...args) {
        this.bytecode.addStep("elementMap", args);
        return this;
      }
      emit(...args) {
        this.bytecode.addStep("emit", args);
        return this;
      }
      fail(...args) {
        this.bytecode.addStep("fail", args);
        return this;
      }
      filter(...args) {
        this.bytecode.addStep("filter", args);
        return this;
      }
      flatMap(...args) {
        this.bytecode.addStep("flatMap", args);
        return this;
      }
      fold(...args) {
        this.bytecode.addStep("fold", args);
        return this;
      }
      from_(...args) {
        this.bytecode.addStep("from", args);
        return this;
      }
      group(...args) {
        this.bytecode.addStep("group", args);
        return this;
      }
      groupCount(...args) {
        this.bytecode.addStep("groupCount", args);
        return this;
      }
      has(...args) {
        this.bytecode.addStep("has", args);
        return this;
      }
      hasId(...args) {
        this.bytecode.addStep("hasId", args);
        return this;
      }
      hasKey(...args) {
        this.bytecode.addStep("hasKey", args);
        return this;
      }
      hasLabel(...args) {
        this.bytecode.addStep("hasLabel", args);
        return this;
      }
      hasNot(...args) {
        this.bytecode.addStep("hasNot", args);
        return this;
      }
      hasValue(...args) {
        this.bytecode.addStep("hasValue", args);
        return this;
      }
      id(...args) {
        this.bytecode.addStep("id", args);
        return this;
      }
      identity(...args) {
        this.bytecode.addStep("identity", args);
        return this;
      }
      in_(...args) {
        this.bytecode.addStep("in", args);
        return this;
      }
      inE(...args) {
        this.bytecode.addStep("inE", args);
        return this;
      }
      inV(...args) {
        this.bytecode.addStep("inV", args);
        return this;
      }
      index(...args) {
        this.bytecode.addStep("index", args);
        return this;
      }
      inject(...args) {
        this.bytecode.addStep("inject", args);
        return this;
      }
      is(...args) {
        this.bytecode.addStep("is", args);
        return this;
      }
      key(...args) {
        this.bytecode.addStep("key", args);
        return this;
      }
      label(...args) {
        this.bytecode.addStep("label", args);
        return this;
      }
      limit(...args) {
        this.bytecode.addStep("limit", args);
        return this;
      }
      local(...args) {
        this.bytecode.addStep("local", args);
        return this;
      }
      loops(...args) {
        this.bytecode.addStep("loops", args);
        return this;
      }
      map(...args) {
        this.bytecode.addStep("map", args);
        return this;
      }
      match(...args) {
        this.bytecode.addStep("match", args);
        return this;
      }
      math(...args) {
        this.bytecode.addStep("math", args);
        return this;
      }
      max(...args) {
        this.bytecode.addStep("max", args);
        return this;
      }
      mean(...args) {
        this.bytecode.addStep("mean", args);
        return this;
      }
      mergeE(...args) {
        this.bytecode.addStep("mergeE", args);
        return this;
      }
      mergeV(...args) {
        this.bytecode.addStep("mergeV", args);
        return this;
      }
      min(...args) {
        this.bytecode.addStep("min", args);
        return this;
      }
      none(...args) {
        this.bytecode.addStep("none", args);
        return this;
      }
      not(...args) {
        this.bytecode.addStep("not", args);
        return this;
      }
      option(...args) {
        this.bytecode.addStep("option", args);
        return this;
      }
      optional(...args) {
        this.bytecode.addStep("optional", args);
        return this;
      }
      or(...args) {
        this.bytecode.addStep("or", args);
        return this;
      }
      order(...args) {
        this.bytecode.addStep("order", args);
        return this;
      }
      otherV(...args) {
        this.bytecode.addStep("otherV", args);
        return this;
      }
      out(...args) {
        this.bytecode.addStep("out", args);
        return this;
      }
      outE(...args) {
        this.bytecode.addStep("outE", args);
        return this;
      }
      outV(...args) {
        this.bytecode.addStep("outV", args);
        return this;
      }
      pageRank(...args) {
        this.bytecode.addStep("pageRank", args);
        return this;
      }
      path(...args) {
        this.bytecode.addStep("path", args);
        return this;
      }
      peerPressure(...args) {
        this.bytecode.addStep("peerPressure", args);
        return this;
      }
      profile(...args) {
        this.bytecode.addStep("profile", args);
        return this;
      }
      program(...args) {
        this.bytecode.addStep("program", args);
        return this;
      }
      project(...args) {
        this.bytecode.addStep("project", args);
        return this;
      }
      properties(...args) {
        this.bytecode.addStep("properties", args);
        return this;
      }
      property(...args) {
        this.bytecode.addStep("property", args);
        return this;
      }
      propertyMap(...args) {
        this.bytecode.addStep("propertyMap", args);
        return this;
      }
      range(...args) {
        this.bytecode.addStep("range", args);
        return this;
      }
      read(...args) {
        this.bytecode.addStep("read", args);
        return this;
      }
      repeat(...args) {
        this.bytecode.addStep("repeat", args);
        return this;
      }
      sack(...args) {
        this.bytecode.addStep("sack", args);
        return this;
      }
      sample(...args) {
        this.bytecode.addStep("sample", args);
        return this;
      }
      select(...args) {
        this.bytecode.addStep("select", args);
        return this;
      }
      shortestPath(...args) {
        this.bytecode.addStep("shortestPath", args);
        return this;
      }
      sideEffect(...args) {
        this.bytecode.addStep("sideEffect", args);
        return this;
      }
      simplePath(...args) {
        this.bytecode.addStep("simplePath", args);
        return this;
      }
      skip(...args) {
        this.bytecode.addStep("skip", args);
        return this;
      }
      store(...args) {
        this.bytecode.addStep("store", args);
        return this;
      }
      subgraph(...args) {
        this.bytecode.addStep("subgraph", args);
        return this;
      }
      sum(...args) {
        this.bytecode.addStep("sum", args);
        return this;
      }
      tail(...args) {
        this.bytecode.addStep("tail", args);
        return this;
      }
      timeLimit(...args) {
        this.bytecode.addStep("timeLimit", args);
        return this;
      }
      times(...args) {
        this.bytecode.addStep("times", args);
        return this;
      }
      to(...args) {
        this.bytecode.addStep("to", args);
        return this;
      }
      toE(...args) {
        this.bytecode.addStep("toE", args);
        return this;
      }
      toV(...args) {
        this.bytecode.addStep("toV", args);
        return this;
      }
      tree(...args) {
        this.bytecode.addStep("tree", args);
        return this;
      }
      unfold(...args) {
        this.bytecode.addStep("unfold", args);
        return this;
      }
      union(...args) {
        this.bytecode.addStep("union", args);
        return this;
      }
      until(...args) {
        this.bytecode.addStep("until", args);
        return this;
      }
      value(...args) {
        this.bytecode.addStep("value", args);
        return this;
      }
      valueMap(...args) {
        this.bytecode.addStep("valueMap", args);
        return this;
      }
      values(...args) {
        this.bytecode.addStep("values", args);
        return this;
      }
      where(...args) {
        this.bytecode.addStep("where", args);
        return this;
      }
      with_(...args) {
        this.bytecode.addStep("with", args);
        return this;
      }
      write(...args) {
        this.bytecode.addStep("write", args);
        return this;
      }
    };
    function callOnEmptyTraversal(fnName, args) {
      const g = new GraphTraversal(null, null, new Bytecode());
      return g[fnName].apply(g, args);
    }
    var statics = {
      V: (...args) => callOnEmptyTraversal("V", args),
      addE: (...args) => callOnEmptyTraversal("addE", args),
      addV: (...args) => callOnEmptyTraversal("addV", args),
      aggregate: (...args) => callOnEmptyTraversal("aggregate", args),
      and: (...args) => callOnEmptyTraversal("and", args),
      as: (...args) => callOnEmptyTraversal("as", args),
      barrier: (...args) => callOnEmptyTraversal("barrier", args),
      both: (...args) => callOnEmptyTraversal("both", args),
      bothE: (...args) => callOnEmptyTraversal("bothE", args),
      bothV: (...args) => callOnEmptyTraversal("bothV", args),
      branch: (...args) => callOnEmptyTraversal("branch", args),
      call: (...args) => callOnEmptyTraversal("call", args),
      cap: (...args) => callOnEmptyTraversal("cap", args),
      choose: (...args) => callOnEmptyTraversal("choose", args),
      coalesce: (...args) => callOnEmptyTraversal("coalesce", args),
      coin: (...args) => callOnEmptyTraversal("coin", args),
      constant: (...args) => callOnEmptyTraversal("constant", args),
      count: (...args) => callOnEmptyTraversal("count", args),
      cyclicPath: (...args) => callOnEmptyTraversal("cyclicPath", args),
      dedup: (...args) => callOnEmptyTraversal("dedup", args),
      drop: (...args) => callOnEmptyTraversal("drop", args),
      element: (...args) => callOnEmptyTraversal("element", args),
      elementMap: (...args) => callOnEmptyTraversal("elementMap", args),
      emit: (...args) => callOnEmptyTraversal("emit", args),
      fail: (...args) => callOnEmptyTraversal("fail", args),
      filter: (...args) => callOnEmptyTraversal("filter", args),
      flatMap: (...args) => callOnEmptyTraversal("flatMap", args),
      fold: (...args) => callOnEmptyTraversal("fold", args),
      group: (...args) => callOnEmptyTraversal("group", args),
      groupCount: (...args) => callOnEmptyTraversal("groupCount", args),
      has: (...args) => callOnEmptyTraversal("has", args),
      hasId: (...args) => callOnEmptyTraversal("hasId", args),
      hasKey: (...args) => callOnEmptyTraversal("hasKey", args),
      hasLabel: (...args) => callOnEmptyTraversal("hasLabel", args),
      hasNot: (...args) => callOnEmptyTraversal("hasNot", args),
      hasValue: (...args) => callOnEmptyTraversal("hasValue", args),
      id: (...args) => callOnEmptyTraversal("id", args),
      identity: (...args) => callOnEmptyTraversal("identity", args),
      in_: (...args) => callOnEmptyTraversal("in_", args),
      inE: (...args) => callOnEmptyTraversal("inE", args),
      inV: (...args) => callOnEmptyTraversal("inV", args),
      index: (...args) => callOnEmptyTraversal("index", args),
      inject: (...args) => callOnEmptyTraversal("inject", args),
      is: (...args) => callOnEmptyTraversal("is", args),
      key: (...args) => callOnEmptyTraversal("key", args),
      label: (...args) => callOnEmptyTraversal("label", args),
      limit: (...args) => callOnEmptyTraversal("limit", args),
      local: (...args) => callOnEmptyTraversal("local", args),
      loops: (...args) => callOnEmptyTraversal("loops", args),
      map: (...args) => callOnEmptyTraversal("map", args),
      match: (...args) => callOnEmptyTraversal("match", args),
      math: (...args) => callOnEmptyTraversal("math", args),
      max: (...args) => callOnEmptyTraversal("max", args),
      mean: (...args) => callOnEmptyTraversal("mean", args),
      mergeE: (...args) => callOnEmptyTraversal("mergeE", args),
      mergeV: (...args) => callOnEmptyTraversal("mergeV", args),
      min: (...args) => callOnEmptyTraversal("min", args),
      not: (...args) => callOnEmptyTraversal("not", args),
      optional: (...args) => callOnEmptyTraversal("optional", args),
      or: (...args) => callOnEmptyTraversal("or", args),
      order: (...args) => callOnEmptyTraversal("order", args),
      otherV: (...args) => callOnEmptyTraversal("otherV", args),
      out: (...args) => callOnEmptyTraversal("out", args),
      outE: (...args) => callOnEmptyTraversal("outE", args),
      outV: (...args) => callOnEmptyTraversal("outV", args),
      path: (...args) => callOnEmptyTraversal("path", args),
      project: (...args) => callOnEmptyTraversal("project", args),
      properties: (...args) => callOnEmptyTraversal("properties", args),
      property: (...args) => callOnEmptyTraversal("property", args),
      propertyMap: (...args) => callOnEmptyTraversal("propertyMap", args),
      range: (...args) => callOnEmptyTraversal("range", args),
      repeat: (...args) => callOnEmptyTraversal("repeat", args),
      sack: (...args) => callOnEmptyTraversal("sack", args),
      sample: (...args) => callOnEmptyTraversal("sample", args),
      select: (...args) => callOnEmptyTraversal("select", args),
      sideEffect: (...args) => callOnEmptyTraversal("sideEffect", args),
      simplePath: (...args) => callOnEmptyTraversal("simplePath", args),
      skip: (...args) => callOnEmptyTraversal("skip", args),
      store: (...args) => callOnEmptyTraversal("store", args),
      subgraph: (...args) => callOnEmptyTraversal("subgraph", args),
      sum: (...args) => callOnEmptyTraversal("sum", args),
      tail: (...args) => callOnEmptyTraversal("tail", args),
      timeLimit: (...args) => callOnEmptyTraversal("timeLimit", args),
      times: (...args) => callOnEmptyTraversal("times", args),
      to: (...args) => callOnEmptyTraversal("to", args),
      toE: (...args) => callOnEmptyTraversal("toE", args),
      toV: (...args) => callOnEmptyTraversal("toV", args),
      tree: (...args) => callOnEmptyTraversal("tree", args),
      unfold: (...args) => callOnEmptyTraversal("unfold", args),
      union: (...args) => callOnEmptyTraversal("union", args),
      until: (...args) => callOnEmptyTraversal("until", args),
      value: (...args) => callOnEmptyTraversal("value", args),
      valueMap: (...args) => callOnEmptyTraversal("valueMap", args),
      values: (...args) => callOnEmptyTraversal("values", args),
      where: (...args) => callOnEmptyTraversal("where", args)
    };
    module.exports = {
      GraphTraversal,
      GraphTraversalSource,
      statics
    };
  }
});
var require_graph = __commonJS({
  "node_modules/gremlin/lib/structure/graph.js"(exports, module) {
    var gt = require_graph_traversal();
    var { TraversalStrategies } = require_traversal_strategy();
    var Graph = class {
      traversal(traversalSourceClass) {
        const traversalSourceConstructor = traversalSourceClass || gt.GraphTraversalSource;
        return new traversalSourceConstructor(this, new TraversalStrategies());
      }
      toString() {
        return "graph[]";
      }
    };
    var Element = class {
      constructor(id, label) {
        this.id = id;
        this.label = label;
      }
      equals(other) {
        return other instanceof Element && this.id === other.id;
      }
    };
    var Vertex = class extends Element {
      constructor(id, label, properties) {
        super(id, label);
        this.properties = properties;
      }
      toString() {
        return `v[${this.id}]`;
      }
    };
    var Edge = class extends Element {
      constructor(id, outV, label, inV, properties) {
        super(id, label);
        this.outV = outV;
        this.inV = inV;
        this.properties = {};
        if (properties) {
          const keys = Object.keys(properties);
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            this.properties[k] = properties[k].value;
          }
        }
      }
      toString() {
        const outVId = this.outV ? this.outV.id : "?";
        const inVId = this.inV ? this.inV.id : "?";
        return `e[${this.id}][${outVId}-${this.label}->${inVId}]`;
      }
    };
    var VertexProperty = class extends Element {
      constructor(id, label, value, properties) {
        super(id, label);
        this.value = value;
        this.key = this.label;
        this.properties = properties;
      }
      toString() {
        return `vp[${this.label}->${summarize(this.value)}]`;
      }
    };
    var Property = class {
      constructor(key, value) {
        this.key = key;
        this.value = value;
      }
      toString() {
        return `p[${this.key}->${summarize(this.value)}]`;
      }
      equals(other) {
        return other instanceof Property && this.key === other.key && this.value === other.value;
      }
    };
    var Path = class {
      constructor(labels, objects) {
        this.labels = labels;
        this.objects = objects;
      }
      toString() {
        return `path[${(this.objects || []).join(", ")}]`;
      }
      equals(other) {
        if (!(other instanceof Path)) {
          return false;
        }
        if (other === this) {
          return true;
        }
        return areEqual(this.objects, other.objects) && areEqual(this.labels, other.labels);
      }
    };
    function areEqual(obj1, obj2) {
      if (obj1 === obj2) {
        return true;
      }
      if (typeof obj1.equals === "function") {
        return obj1.equals(obj2);
      }
      if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (let i = 0; i < obj1.length; i++) {
          if (!areEqual(obj1[i], obj2[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    function summarize(value) {
      if (value === null || value === void 0) {
        return value;
      }
      const strValue = value.toString();
      return strValue.length > 20 ? strValue.substr(0, 20) : strValue;
    }
    module.exports = {
      Edge,
      Graph,
      Path,
      Property,
      Vertex,
      VertexProperty
    };
  }
});
var crypto_exports = {};
var init_crypto = __esm({
  "external:crypto"() {
    __reExport(crypto_exports, crypto_star);
  }
});
var require_utils = __commonJS({
  "node_modules/gremlin/lib/utils.js"(exports) {
    var crypto = (init_crypto(), __toCommonJS(crypto_exports));
    exports.toLong = function toLong(value) {
      return new Long(value);
    };
    var Long = exports.Long = function Long2(value) {
      if (typeof value !== "string" && typeof value !== "number") {
        throw new TypeError("The value must be a string or a number");
      }
      this.value = value.toString();
    };
    exports.getUuid = function getUuid() {
      const buffer = crypto.randomBytes(16);
      buffer[6] &= 15;
      buffer[6] |= 64;
      buffer[8] &= 63;
      buffer[8] |= 128;
      const hex = buffer.toString("hex");
      return hex.substr(0, 8) + "-" + hex.substr(8, 4) + "-" + hex.substr(12, 4) + "-" + hex.substr(16, 4) + "-" + hex.substr(20, 12);
    };
    exports.emptyArray = Object.freeze([]);
    var ImmutableMap = class extends Map {
      constructor(iterable) {
        super(iterable);
      }
      set() {
        return this;
      }
      ["delete"]() {
        return false;
      }
      clear() {
      }
    };
    exports.ImmutableMap = ImmutableMap;
  }
});
var require_type_serializers = __commonJS({
  "node_modules/gremlin/lib/structure/io/type-serializers.js"(exports, module) {
    var t = require_traversal();
    var ts = require_traversal_strategy();
    var Bytecode = require_bytecode();
    var g = require_graph();
    var utils = require_utils();
    var valueKey = "@value";
    var typeKey = "@type";
    var TypeSerializer = class {
      serialize() {
        throw new Error("serialize() method not implemented for " + this.constructor.name);
      }
      deserialize() {
        throw new Error("deserialize() method not implemented for " + this.constructor.name);
      }
      canBeUsedFor() {
        throw new Error("canBeUsedFor() method not implemented for " + this.constructor.name);
      }
    };
    var NumberSerializer = class extends TypeSerializer {
      serialize(item) {
        if (isNaN(item)) {
          return {
            [typeKey]: "g:Double",
            [valueKey]: "NaN"
          };
        } else if (item === Number.POSITIVE_INFINITY) {
          return {
            [typeKey]: "g:Double",
            [valueKey]: "Infinity"
          };
        } else if (item === Number.NEGATIVE_INFINITY) {
          return {
            [typeKey]: "g:Double",
            [valueKey]: "-Infinity"
          };
        }
        return item;
      }
      deserialize(obj) {
        const val = obj[valueKey];
        if (val === "NaN") {
          return NaN;
        } else if (val === "Infinity") {
          return Number.POSITIVE_INFINITY;
        } else if (val === "-Infinity") {
          return Number.NEGATIVE_INFINITY;
        }
        return parseFloat(val);
      }
      canBeUsedFor(value) {
        return typeof value === "number";
      }
    };
    var DateSerializer = class extends TypeSerializer {
      serialize(item) {
        return {
          [typeKey]: "g:Date",
          [valueKey]: item.getTime()
        };
      }
      deserialize(obj) {
        return new Date(obj[valueKey]);
      }
      canBeUsedFor(value) {
        return value instanceof Date;
      }
    };
    var LongSerializer = class extends TypeSerializer {
      serialize(item) {
        return {
          [typeKey]: "g:Int64",
          [valueKey]: item.value
        };
      }
      canBeUsedFor(value) {
        return value instanceof utils.Long;
      }
    };
    var BytecodeSerializer = class extends TypeSerializer {
      serialize(item) {
        let bytecode = item;
        if (item instanceof t.Traversal) {
          bytecode = item.getBytecode();
        }
        const result = {};
        result[typeKey] = "g:Bytecode";
        const resultValue = result[valueKey] = {};
        const sources = this._serializeInstructions(bytecode.sourceInstructions);
        if (sources) {
          resultValue["source"] = sources;
        }
        const steps = this._serializeInstructions(bytecode.stepInstructions);
        if (steps) {
          resultValue["step"] = steps;
        }
        return result;
      }
      _serializeInstructions(instructions) {
        if (instructions.length === 0) {
          return null;
        }
        const result = new Array(instructions.length);
        result[0] = instructions[0];
        for (let i = 0; i < instructions.length; i++) {
          result[i] = instructions[i].map((item) => this.writer.adaptObject(item));
        }
        return result;
      }
      canBeUsedFor(value) {
        return value instanceof Bytecode || value instanceof t.Traversal;
      }
    };
    var PSerializer = class extends TypeSerializer {
      serialize(item) {
        const result = {};
        result[typeKey] = "g:P";
        const resultValue = result[valueKey] = {
          predicate: item.operator
        };
        if (item.other === void 0 || item.other === null) {
          resultValue["value"] = this.writer.adaptObject(item.value);
        } else {
          resultValue["value"] = [this.writer.adaptObject(item.value), this.writer.adaptObject(item.other)];
        }
        return result;
      }
      canBeUsedFor(value) {
        return value instanceof t.P;
      }
    };
    var TextPSerializer = class extends TypeSerializer {
      serialize(item) {
        const result = {};
        result[typeKey] = "g:TextP";
        const resultValue = result[valueKey] = {
          predicate: item.operator
        };
        if (item.other === void 0 || item.other === null) {
          resultValue["value"] = this.writer.adaptObject(item.value);
        } else {
          resultValue["value"] = [this.writer.adaptObject(item.value), this.writer.adaptObject(item.other)];
        }
        return result;
      }
      canBeUsedFor(value) {
        return value instanceof t.TextP;
      }
    };
    var LambdaSerializer = class extends TypeSerializer {
      serialize(item) {
        const lambdaDef = item();
        const returnIsString = typeof lambdaDef === "string";
        const script = returnIsString ? lambdaDef : lambdaDef[0];
        const lang = returnIsString ? "gremlin-groovy" : lambdaDef[1];
        const argCount = lang === "gremlin-groovy" && script.includes("->") ? script.substring(0, script.indexOf("->")).includes(",") ? 2 : 1 : -1;
        return {
          [typeKey]: "g:Lambda",
          [valueKey]: {
            arguments: argCount,
            language: lang,
            script
          }
        };
      }
      canBeUsedFor(value) {
        return typeof value === "function";
      }
    };
    var EnumSerializer = class extends TypeSerializer {
      serialize(item) {
        return {
          [typeKey]: "g:" + item.typeName,
          [valueKey]: item.elementName
        };
      }
      canBeUsedFor(value) {
        return value && value.typeName && value instanceof t.EnumValue;
      }
    };
    var TraverserSerializer = class extends TypeSerializer {
      serialize(item) {
        return {
          [typeKey]: "g:Traverser",
          [valueKey]: {
            value: this.writer.adaptObject(item.object),
            bulk: this.writer.adaptObject(item.bulk)
          }
        };
      }
      deserialize(obj) {
        const value = obj[valueKey];
        return new t.Traverser(this.reader.read(value["value"]), this.reader.read(value["bulk"]));
      }
      canBeUsedFor(value) {
        return value instanceof t.Traverser;
      }
    };
    var TraversalStrategySerializer = class extends TypeSerializer {
      serialize(item) {
        const conf = {};
        for (const k in item.configuration) {
          if (item.configuration.hasOwnProperty(k)) {
            conf[k] = this.writer.adaptObject(item.configuration[k]);
          }
        }
        return {
          [typeKey]: "g:" + item.constructor.name,
          [valueKey]: conf
        };
      }
      canBeUsedFor(value) {
        return value instanceof ts.TraversalStrategy;
      }
    };
    var VertexSerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        return new g.Vertex(this.reader.read(value["id"]), value["label"], this.reader.read(value["properties"]));
      }
      serialize(item) {
        return {
          [typeKey]: "g:Vertex",
          [valueKey]: {
            id: this.writer.adaptObject(item.id),
            label: item.label
          }
        };
      }
      canBeUsedFor(value) {
        return value instanceof g.Vertex;
      }
    };
    var VertexPropertySerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        return new g.VertexProperty(
          this.reader.read(value["id"]),
          value["label"],
          this.reader.read(value["value"]),
          this.reader.read(value["properties"])
        );
      }
    };
    var PropertySerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        return new g.Property(value["key"], this.reader.read(value["value"]));
      }
    };
    var EdgeSerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        return new g.Edge(
          this.reader.read(value["id"]),
          new g.Vertex(this.reader.read(value["outV"]), this.reader.read(value["outVLabel"])),
          value["label"],
          new g.Vertex(this.reader.read(value["inV"]), this.reader.read(value["inVLabel"])),
          this.reader.read(value["properties"])
        );
      }
      serialize(item) {
        return {
          [typeKey]: "g:Edge",
          [valueKey]: {
            id: this.writer.adaptObject(item.id),
            label: item.label,
            outV: this.writer.adaptObject(item.outV.id),
            outVLabel: item.outV.label,
            inV: this.writer.adaptObject(item.inV.id),
            inVLabel: item.inV.label
          }
        };
      }
      canBeUsedFor(value) {
        return value instanceof g.Edge;
      }
    };
    var PathSerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        const objects = value["objects"].map((o) => this.reader.read(o));
        return new g.Path(this.reader.read(value["labels"]), objects);
      }
    };
    var Path3Serializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        return new g.Path(this.reader.read(value["labels"]), this.reader.read(value["objects"]));
      }
    };
    var TSerializer = class extends TypeSerializer {
      deserialize(obj) {
        return t.t[obj[valueKey]];
      }
    };
    var DirectionSerializer = class extends TypeSerializer {
      deserialize(obj) {
        return t.direction[obj[valueKey].toLowerCase()];
      }
    };
    var ArraySerializer = class extends TypeSerializer {
      constructor(typeKey2) {
        super();
        this.typeKey = typeKey2;
      }
      deserialize(obj) {
        const value = obj[valueKey];
        if (!Array.isArray(value)) {
          throw new Error("Expected Array, obtained: " + value);
        }
        return value.map((x) => this.reader.read(x));
      }
      serialize(item) {
        return {
          [typeKey]: this.typeKey,
          [valueKey]: item.map((x) => this.writer.adaptObject(x))
        };
      }
      canBeUsedFor(value) {
        return Array.isArray(value);
      }
    };
    var BulkSetSerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        if (!Array.isArray(value)) {
          throw new Error("Expected Array, obtained: " + value);
        }
        let result = [];
        for (let ix = 0, iy = value.length; ix < iy; ix += 2) {
          const pair = value.slice(ix, ix + 2);
          result = result.concat(Array(this.reader.read(pair[1])).fill(this.reader.read(pair[0])));
        }
        return result;
      }
    };
    var MapSerializer = class extends TypeSerializer {
      deserialize(obj) {
        const value = obj[valueKey];
        if (!Array.isArray(value)) {
          throw new Error("Expected Array, obtained: " + value);
        }
        const result = /* @__PURE__ */ new Map();
        for (let i = 0; i < value.length; i += 2) {
          result.set(this.reader.read(value[i]), this.reader.read(value[i + 1]));
        }
        return result;
      }
      serialize(map) {
        const arr = [];
        map.forEach((v, k) => {
          arr.push(this.writer.adaptObject(k));
          arr.push(this.writer.adaptObject(v));
        });
        return {
          [typeKey]: "g:Map",
          [valueKey]: arr
        };
      }
      canBeUsedFor(value) {
        return value instanceof Map;
      }
    };
    var ListSerializer = class extends ArraySerializer {
      constructor() {
        super("g:List");
      }
    };
    var SetSerializer = class extends ArraySerializer {
      constructor() {
        super("g:Set");
      }
    };
    module.exports = {
      BulkSetSerializer,
      BytecodeSerializer,
      DateSerializer,
      DirectionSerializer,
      EdgeSerializer,
      EnumSerializer,
      LambdaSerializer,
      ListSerializer,
      LongSerializer,
      MapSerializer,
      NumberSerializer,
      Path3Serializer,
      PathSerializer,
      PropertySerializer,
      PSerializer,
      TextPSerializer,
      SetSerializer,
      TSerializer,
      TraverserSerializer,
      TraversalStrategySerializer,
      typeKey,
      valueKey,
      VertexPropertySerializer,
      VertexSerializer
    };
  }
});
var require_graph_serializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/graph-serializer.js"(exports, module) {
    var typeSerializers = require_type_serializers();
    var Bytecode = require_bytecode();
    var GraphSON2Writer = class {
      constructor(options) {
        this._options = options || {};
        this._serializers = this.getDefaultSerializers().map((serializerConstructor) => {
          const s = new serializerConstructor();
          s.writer = this;
          return s;
        });
        const customSerializers = this._options.serializers || {};
        Object.keys(customSerializers).forEach((key) => {
          const s = customSerializers[key];
          if (!s.serialize) {
            return;
          }
          s.writer = this;
          this._serializers.unshift(s);
        });
      }
      getDefaultSerializers() {
        return graphSON2Serializers;
      }
      adaptObject(value) {
        let s;
        for (let i = 0; i < this._serializers.length; i++) {
          const currentSerializer = this._serializers[i];
          if (currentSerializer.canBeUsedFor && currentSerializer.canBeUsedFor(value)) {
            s = currentSerializer;
            break;
          }
        }
        if (s) {
          return s.serialize(value);
        }
        if (Array.isArray(value)) {
          return value.map((item) => this.adaptObject(item));
        }
        return value;
      }
      write(obj) {
        return JSON.stringify(this.adaptObject(obj));
      }
      writeRequest({ requestId, op, processor, args }) {
        const req = {
          requestId: { "@type": "g:UUID", "@value": requestId },
          op,
          processor,
          args: this._adaptArgs(args, true)
        };
        if (req.args["gremlin"] instanceof Bytecode) {
          req.args["gremlin"] = this.adaptObject(req.args["gremlin"]);
        }
        return Buffer.from(JSON.stringify(req));
      }
      _adaptArgs(args, protocolLevel) {
        if (args instanceof Object) {
          const newObj = {};
          Object.keys(args).forEach((key) => {
            if (protocolLevel && key === "bindings") {
              newObj[key] = this._adaptArgs(args[key], false);
            } else {
              newObj[key] = this.adaptObject(args[key]);
            }
          });
          return newObj;
        }
        return args;
      }
    };
    var GraphSON3Writer = class extends GraphSON2Writer {
      getDefaultSerializers() {
        return graphSON3Serializers;
      }
    };
    var GraphSON2Reader = class {
      constructor(options) {
        this._options = options || {};
        this._deserializers = {};
        const defaultDeserializers = this.getDefaultDeserializers();
        Object.keys(defaultDeserializers).forEach((typeName) => {
          const serializerConstructor = defaultDeserializers[typeName];
          const s = new serializerConstructor();
          s.reader = this;
          this._deserializers[typeName] = s;
        });
        if (this._options.serializers) {
          const customSerializers = this._options.serializers || {};
          Object.keys(customSerializers).forEach((key) => {
            const s = customSerializers[key];
            if (!s.deserialize) {
              return;
            }
            s.reader = this;
            this._deserializers[key] = s;
          });
        }
      }
      getDefaultDeserializers() {
        return graphSON2Deserializers;
      }
      read(obj) {
        if (obj === void 0) {
          return void 0;
        }
        if (obj === null) {
          return null;
        }
        if (Array.isArray(obj)) {
          return obj.map((item) => this.read(item));
        }
        const type = obj[typeSerializers.typeKey];
        if (type) {
          const d = this._deserializers[type];
          if (d) {
            return d.deserialize(obj);
          }
          return obj[typeSerializers.valueKey];
        }
        if (obj && typeof obj === "object" && obj.constructor === Object) {
          return this._deserializeObject(obj);
        }
        return obj;
      }
      readResponse(buffer) {
        return this.read(JSON.parse(buffer.toString()));
      }
      _deserializeObject(obj) {
        const keys = Object.keys(obj);
        const result = {};
        for (let i = 0; i < keys.length; i++) {
          result[keys[i]] = this.read(obj[keys[i]]);
        }
        return result;
      }
    };
    var GraphSON3Reader = class extends GraphSON2Reader {
      getDefaultDeserializers() {
        return graphSON3Deserializers;
      }
    };
    var graphSON2Deserializers = {
      "g:Traverser": typeSerializers.TraverserSerializer,
      "g:TraversalStrategy": typeSerializers.TraversalStrategySerializer,
      "g:Int32": typeSerializers.NumberSerializer,
      "g:Int64": typeSerializers.NumberSerializer,
      "g:Float": typeSerializers.NumberSerializer,
      "g:Double": typeSerializers.NumberSerializer,
      "g:Date": typeSerializers.DateSerializer,
      "g:Direction": typeSerializers.DirectionSerializer,
      "g:Vertex": typeSerializers.VertexSerializer,
      "g:Edge": typeSerializers.EdgeSerializer,
      "g:VertexProperty": typeSerializers.VertexPropertySerializer,
      "g:Property": typeSerializers.PropertySerializer,
      "g:Path": typeSerializers.Path3Serializer,
      "g:TextP": typeSerializers.TextPSerializer,
      "g:T": typeSerializers.TSerializer,
      "g:BulkSet": typeSerializers.BulkSetSerializer
    };
    var graphSON3Deserializers = Object.assign({}, graphSON2Deserializers, {
      "g:List": typeSerializers.ListSerializer,
      "g:Set": typeSerializers.SetSerializer,
      "g:Map": typeSerializers.MapSerializer
    });
    var graphSON2Serializers = [
      typeSerializers.NumberSerializer,
      typeSerializers.DateSerializer,
      typeSerializers.BytecodeSerializer,
      typeSerializers.TraverserSerializer,
      typeSerializers.TraversalStrategySerializer,
      typeSerializers.PSerializer,
      typeSerializers.TextPSerializer,
      typeSerializers.LambdaSerializer,
      typeSerializers.EnumSerializer,
      typeSerializers.VertexSerializer,
      typeSerializers.EdgeSerializer,
      typeSerializers.LongSerializer
    ];
    var graphSON3Serializers = graphSON2Serializers.concat([
      typeSerializers.ListSerializer,
      typeSerializers.SetSerializer,
      typeSerializers.MapSerializer
    ]);
    module.exports = {
      GraphSON3Writer,
      GraphSON3Reader,
      GraphSON2Writer,
      GraphSON2Reader,
      GraphSONWriter: GraphSON3Writer,
      GraphSONReader: GraphSON3Reader
    };
  }
});
var require_translator = __commonJS({
  "node_modules/gremlin/lib/process/translator.js"(exports, module) {
    var Traversal = require_traversal().Traversal;
    var Bytecode = require_bytecode();
    var Translator = class {
      constructor(traversalSource) {
        this._traversalSource = traversalSource;
      }
      getTraversalSource() {
        return this._traversalSource;
      }
      getTargetLanguage() {
        return "gremlin-groovy";
      }
      of(traversalSource) {
        this._traversalSource = traversalSource;
      }
      translate(bytecodeOrTraversal, child = false) {
        let script = child ? "__" : this._traversalSource;
        const bc = bytecodeOrTraversal instanceof Bytecode ? bytecodeOrTraversal : bytecodeOrTraversal.getBytecode();
        const instructions = bc.stepInstructions;
        for (let i = 0; i < instructions.length; i++) {
          const params = instructions[i].slice(1);
          script += "." + instructions[i][0] + "(";
          if (params.length) {
            for (let k = 0; k < params.length; k++) {
              if (k > 0) {
                script += ", ";
              }
              script += this.convert(params[k]);
            }
          }
          script += ")";
        }
        return script;
      }
      convert(anyObject) {
        let script = "";
        if (Object(anyObject) === anyObject) {
          if (anyObject instanceof Traversal) {
            script += this.translate(anyObject.getBytecode(), true);
          } else if (anyObject.toString() === "[object Object]") {
            Object.keys(anyObject).forEach(function(key, index) {
              if (index > 0) {
                script += ", ";
              }
              script += `('${key}', `;
              if (anyObject[key] instanceof String || typeof anyObject[key] === "string") {
                script += `'${anyObject[key]}'`;
              } else {
                script += anyObject[key];
              }
              script += ")";
            });
          } else if (Array.isArray(anyObject)) {
            const parts = [];
            for (const item of anyObject) {
              parts.push(this.convert(item));
            }
            script += "[" + parts.join(", ") + "]";
          } else {
            script += anyObject.toString();
          }
        } else if (anyObject === void 0) {
          script += "";
        } else if (typeof anyObject === "number" || typeof anyObject === "boolean") {
          script += anyObject;
        } else {
          script += `'${anyObject}'`;
        }
        return script;
      }
    };
    module.exports = Translator;
  }
});
var events_exports = {};
var init_events = __esm({
  "external:events"() {
    __reExport(events_exports, events_star);
  }
});
var stream_exports = {};
var init_stream = __esm({
  "external:stream"() {
    __reExport(stream_exports, stream_star);
  }
});
var https_exports = {};
var init_https = __esm({
  "external:https"() {
    __reExport(https_exports, https_star);
  }
});
var http_exports = {};
var init_http = __esm({
  "external:http"() {
    __reExport(http_exports, http_star);
  }
});
var net_exports = {};
var init_net = __esm({
  "external:net"() {
    __reExport(net_exports, net_star);
  }
});
var tls_exports = {};
var init_tls = __esm({
  "external:tls"() {
    __reExport(tls_exports, tls_star);
  }
});
var url_exports = {};
var init_url = __esm({
  "external:url"() {
    __reExport(url_exports, url_star);
  }
});
var require_async_limiter = __commonJS({
  "node_modules/async-limiter/index.js"(exports, module) {
    function Queue(options) {
      if (!(this instanceof Queue)) {
        return new Queue(options);
      }
      options = options || {};
      this.concurrency = options.concurrency || Infinity;
      this.pending = 0;
      this.jobs = [];
      this.cbs = [];
      this._done = done.bind(this);
    }
    var arrayAddMethods = [
      "push",
      "unshift",
      "splice"
    ];
    arrayAddMethods.forEach(function(method) {
      Queue.prototype[method] = function() {
        var methodResult = Array.prototype[method].apply(this.jobs, arguments);
        this._run();
        return methodResult;
      };
    });
    Object.defineProperty(Queue.prototype, "length", {
      get: function() {
        return this.pending + this.jobs.length;
      }
    });
    Queue.prototype._run = function() {
      if (this.pending === this.concurrency) {
        return;
      }
      if (this.jobs.length) {
        var job = this.jobs.shift();
        this.pending++;
        job(this._done);
        this._run();
      }
      if (this.pending === 0) {
        while (this.cbs.length !== 0) {
          var cb = this.cbs.pop();
          process.nextTick(cb);
        }
      }
    };
    Queue.prototype.onDone = function(cb) {
      if (typeof cb === "function") {
        this.cbs.push(cb);
        this._run();
      }
    };
    function done() {
      this.pending--;
      this._run();
    }
    module.exports = Queue;
  }
});
var zlib_exports = {};
var init_zlib = __esm({
  "external:zlib"() {
    __reExport(zlib_exports, zlib_star);
  }
});
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports, module) {
    module.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      EMPTY_BUFFER: Buffer.alloc(0),
      NOOP: () => {
      }
    };
  }
});
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports, module) {
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      var offset = 0;
      for (var i = 0; i < list.length; i++) {
        const buf = list[i];
        buf.copy(target, offset);
        offset += buf.length;
      }
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (var i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      const length = buffer.length;
      for (var i = 0; i < length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      var buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = viewToBuffer(data);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    function viewToBuffer(view) {
      const buf = Buffer.from(view.buffer);
      if (view.byteLength !== view.buffer.byteLength) {
        return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
      }
      return buf;
    }
    try {
      const bufferUtil = __require("bufferutil");
      const bu = bufferUtil.BufferUtil || bufferUtil;
      module.exports = {
        concat,
        mask(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bu.mask(source, mask, output, offset, length);
        },
        toArrayBuffer,
        toBuffer,
        unmask(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bu.unmask(buffer, mask);
        }
      };
    } catch (e) {
      module.exports = {
        concat,
        mask: _mask,
        toArrayBuffer,
        toBuffer,
        unmask: _unmask
      };
    }
  }
});
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    var Limiter = require_async_limiter();
    var zlib = (init_zlib(), __toCommonJS(zlib_exports));
    var bufferUtil = require_buffer_util();
    var { kStatusCode, NOOP } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var EMPTY_BLOCK = Buffer.from([0]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter({ concurrency });
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          this._deflate.close();
          this._deflate = null;
        }
      }
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            var value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      decompress(data, fin, callback) {
        zlibLimiter.push((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      compress(data, fin, callback) {
        zlibLimiter.push((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw(
            Object.assign({}, this._options.zlibInflateOptions, { windowBits })
          );
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
          }
          callback(null, data2);
        });
      }
      _compress(data, fin, callback) {
        if (!data || data.length === 0) {
          process.nextTick(callback, null, EMPTY_BLOCK);
          return;
        }
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw(
            Object.assign({}, this._options.zlibDeflateOptions, { windowBits })
          );
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("error", NOOP);
          this._deflate.on("data", deflateOnData);
        }
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          var data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin)
            data2 = data2.slice(0, data2.length - 4);
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.close();
            this._deflate = null;
          } else {
            this._deflate[kTotalLength] = 0;
            this._deflate[kBuffers] = [];
          }
          callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports, module) {
    var Event = class {
      constructor(type, target) {
        this.target = target;
        this.type = type;
      }
    };
    var MessageEvent = class extends Event {
      constructor(data, target) {
        super("message", target);
        this.data = data;
      }
    };
    var CloseEvent = class extends Event {
      constructor(code, reason, target) {
        super("close", target);
        this.wasClean = target._closeFrameReceived && target._closeFrameSent;
        this.reason = reason;
        this.code = code;
      }
    };
    var OpenEvent = class extends Event {
      constructor(target) {
        super("open", target);
      }
    };
    var ErrorEvent = class extends Event {
      constructor(error, target) {
        super("error", target);
        this.message = error.message;
        this.error = error;
      }
    };
    var EventTarget = {
      addEventListener(method, listener) {
        if (typeof listener !== "function")
          return;
        function onMessage(data) {
          listener.call(this, new MessageEvent(data, this));
        }
        function onClose(code, message) {
          listener.call(this, new CloseEvent(code, message, this));
        }
        function onError(error) {
          listener.call(this, new ErrorEvent(error, this));
        }
        function onOpen() {
          listener.call(this, new OpenEvent(this));
        }
        if (method === "message") {
          onMessage._listener = listener;
          this.on(method, onMessage);
        } else if (method === "close") {
          onClose._listener = listener;
          this.on(method, onClose);
        } else if (method === "error") {
          onError._listener = listener;
          this.on(method, onError);
        } else if (method === "open") {
          onOpen._listener = listener;
          this.on(method, onOpen);
        } else {
          this.on(method, listener);
        }
      },
      removeEventListener(method, listener) {
        const listeners = this.listeners(method);
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i] === listener || listeners[i]._listener === listener) {
            this.removeListener(method, listeners[i]);
          }
        }
      }
    };
    module.exports = EventTarget;
  }
});
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports, module) {
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ];
    function push(dest, name, elem) {
      if (Object.prototype.hasOwnProperty.call(dest, name))
        dest[name].push(elem);
      else
        dest[name] = [elem];
    }
    function parse(header) {
      const offers = {};
      if (header === void 0 || header === "")
        return offers;
      var params = {};
      var mustUnescape = false;
      var isEscaping = false;
      var inQuotes = false;
      var extensionName;
      var paramName;
      var start = -1;
      var end = -1;
      for (var i = 0; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = {};
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = {};
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            var value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = {};
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, {});
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        var configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              var values = params[k];
              if (!Array.isArray(values))
                values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module.exports = { format, parse };
  }
});
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports) {
    try {
      const isValidUTF8 = __require("utf-8-validate");
      exports.isValidUTF8 = typeof isValidUTF8 === "object" ? isValidUTF8.Validation.isValidUTF8 : isValidUTF8;
    } catch (e) {
      exports.isValidUTF8 = () => true;
    }
    exports.isValidStatusCode = (code) => {
      return code >= 1e3 && code <= 1013 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    };
  }
});
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports, module) {
    var { Writable } = (init_stream(), __toCommonJS(stream_exports));
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = class extends Writable {
      constructor(binaryType, extensions, maxPayload) {
        super();
        this._binaryType = binaryType || BINARY_TYPES[0];
        this[kWebSocket] = void 0;
        this._extensions = extensions || {};
        this._maxPayload = maxPayload | 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          if (n >= buf.length) {
            this._buffers.shift().copy(dst, dst.length - n);
          } else {
            buf.copy(dst, dst.length - n, 0, n);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      startLoop(cb) {
        var err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(RangeError, "RSV2 and RSV3 must be clear", true, 1002);
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(RangeError, "RSV1 must be clear", true, 1002);
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(RangeError, "RSV1 must be clear", true, 1002);
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(RangeError, "invalid opcode 0", true, 1002);
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(RangeError, "FIN must be set", true, 1002);
          }
          if (compressed) {
            this._loop = false;
            return error(RangeError, "RSV1 must be clear", true, 1002);
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002
            );
          }
        } else {
          this._loop = false;
          return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009
          );
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(RangeError, "Max payload size exceeded", false, 1009);
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      getData(cb) {
        var data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked)
            unmask(data, this._mask);
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(
                error(RangeError, "Max payload size exceeded", false, 1009)
              );
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            var data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data);
          } else {
            const buf = concat(fragments, messageLength);
            if (!isValidUTF8(buf)) {
              this._loop = false;
              return error(Error, "invalid UTF-8 sequence", true, 1007);
            }
            this.emit("message", buf.toString());
          }
        }
        this._state = GET_INFO;
      }
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, "");
            this.end();
          } else if (data.length === 1) {
            return error(RangeError, "invalid payload length 1", true, 1002);
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(RangeError, `invalid status code ${code}`, true, 1002);
            }
            const buf = data.slice(2);
            if (!isValidUTF8(buf)) {
              return error(Error, "invalid UTF-8 sequence", true, 1007);
            }
            this.emit("conclude", code, buf.toString());
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module.exports = Receiver;
    function error(ErrorCtor, message, prefix, statusCode) {
      const err = new ErrorCtor(
        prefix ? `Invalid WebSocket frame: ${message}` : message
      );
      Error.captureStackTrace(err, error);
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports, module) {
    var { randomBytes } = (init_crypto(), __toCommonJS(crypto_exports));
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var Sender = class {
      constructor(socket, extensions) {
        this._extensions = extensions || {};
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      static frame(data, options) {
        const merge = options.mask && options.readOnly;
        var offset = options.mask ? 6 : 2;
        var payloadLength = data.length;
        if (data.length >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (data.length > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(data.length, 2);
        } else if (payloadLength === 127) {
          target.writeUInt32BE(0, 2);
          target.writeUInt32BE(data.length, 6);
        }
        if (!options.mask)
          return [target, data];
        const mask = randomBytes(4);
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (merge) {
          applyMask(data, mask, target, offset, data.length);
          return [target];
        }
        applyMask(data, mask, data, 0, data.length);
        return [target, data];
      }
      close(code, data, mask, cb) {
        var buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || data === "") {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
          buf.writeUInt16BE(code, 0);
          buf.write(data, 2);
        }
        if (this._deflating) {
          this.enqueue([this.doClose, buf, mask, cb]);
        } else {
          this.doClose(buf, mask, cb);
        }
      }
      doClose(data, mask, cb) {
        this.sendFrame(
          Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 8,
            mask,
            readOnly: false
          }),
          cb
        );
      }
      ping(data, mask, cb) {
        const buf = toBuffer(data);
        if (this._deflating) {
          this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
        } else {
          this.doPing(buf, mask, toBuffer.readOnly, cb);
        }
      }
      doPing(data, mask, readOnly, cb) {
        this.sendFrame(
          Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 9,
            mask,
            readOnly
          }),
          cb
        );
      }
      pong(data, mask, cb) {
        const buf = toBuffer(data);
        if (this._deflating) {
          this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
        } else {
          this.doPong(buf, mask, toBuffer.readOnly, cb);
        }
      }
      doPong(data, mask, readOnly, cb) {
        this.sendFrame(
          Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 10,
            mask,
            readOnly
          }),
          cb
        );
      }
      send(data, options, cb) {
        const buf = toBuffer(data);
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        var opcode = options.binary ? 2 : 1;
        var rsv1 = options.compress;
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate) {
            rsv1 = buf.length >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            fin: options.fin,
            rsv1,
            opcode,
            mask: options.mask,
            readOnly: toBuffer.readOnly
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
          } else {
            this.dispatch(buf, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(
            Sender.frame(buf, {
              fin: options.fin,
              rsv1: false,
              opcode,
              mask: options.mask,
              readOnly: toBuffer.readOnly
            }),
            cb
          );
        }
      }
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[1].length;
          params[0].apply(this, params.slice(1));
        }
      }
      enqueue(params) {
        this._bufferedBytes += params[1].length;
        this._queue.push(params);
      }
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module.exports = Sender;
  }
});
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports, module) {
    var EventEmitter = (init_events(), __toCommonJS(events_exports));
    var crypto = (init_crypto(), __toCommonJS(crypto_exports));
    var https = (init_https(), __toCommonJS(https_exports));
    var http = (init_http(), __toCommonJS(http_exports));
    var net = (init_net(), __toCommonJS(net_exports));
    var tls = (init_tls(), __toCommonJS(tls_exports));
    var url = (init_url(), __toCommonJS(url_exports));
    var PerMessageDeflate = require_permessage_deflate();
    var EventTarget = require_event_target();
    var extension = require_extension();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var protocolVersions = [8, 13];
    var closeTimeout = 30 * 1e3;
    var WebSocket = class extends EventEmitter {
      constructor(address, protocols, options) {
        super();
        this.readyState = WebSocket.CONNECTING;
        this.protocol = "";
        this._binaryType = BINARY_TYPES[0];
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = "";
        this._closeTimer = null;
        this._closeCode = 1006;
        this._extensions = {};
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._isServer = false;
          this._redirects = 0;
          if (Array.isArray(protocols)) {
            protocols = protocols.join(", ");
          } else if (typeof protocols === "object" && protocols !== null) {
            options = protocols;
            protocols = void 0;
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      get CONNECTING() {
        return WebSocket.CONNECTING;
      }
      get CLOSING() {
        return WebSocket.CLOSING;
      }
      get CLOSED() {
        return WebSocket.CLOSED;
      }
      get OPEN() {
        return WebSocket.OPEN;
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      get bufferedAmount() {
        if (!this._socket)
          return 0;
        return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      setSocket(socket, head, maxPayload) {
        const receiver = new Receiver(
          this._binaryType,
          this._extensions,
          maxPayload
        );
        this._sender = new Sender(socket, this._extensions);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this.readyState = WebSocket.OPEN;
        this.emit("open");
      }
      emitClose() {
        this.readyState = WebSocket.CLOSED;
        if (!this._socket) {
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this.emit("close", this._closeCode, this._closeMessage);
      }
      close(code, data) {
        if (this.readyState === WebSocket.CLOSED)
          return;
        if (this.readyState === WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === WebSocket.CLOSING) {
          if (this._closeFrameSent && this._closeFrameReceived)
            this._socket.end();
          return;
        }
        this.readyState = WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived)
            this._socket.end();
        });
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
      ping(data, mask, cb) {
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (this.readyState !== WebSocket.OPEN) {
          const err = new Error(
            `WebSocket is not open: readyState ${this.readyState} (${readyStates[this.readyState]})`
          );
          if (cb)
            return cb(err);
          throw err;
        }
        if (typeof data === "number")
          data = data.toString();
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      pong(data, mask, cb) {
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (this.readyState !== WebSocket.OPEN) {
          const err = new Error(
            `WebSocket is not open: readyState ${this.readyState} (${readyStates[this.readyState]})`
          );
          if (cb)
            return cb(err);
          throw err;
        }
        if (typeof data === "number")
          data = data.toString();
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      send(data, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (this.readyState !== WebSocket.OPEN) {
          const err = new Error(
            `WebSocket is not open: readyState ${this.readyState} (${readyStates[this.readyState]})`
          );
          if (cb)
            return cb(err);
          throw err;
        }
        if (typeof data === "number")
          data = data.toString();
        const opts = Object.assign(
          {
            binary: typeof data !== "string",
            mask: !this._isServer,
            compress: true,
            fin: true
          },
          options
        );
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      terminate() {
        if (this.readyState === WebSocket.CLOSED)
          return;
        if (this.readyState === WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this.readyState = WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    readyStates.forEach((readyState, i) => {
      WebSocket[readyState] = i;
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket.prototype, `on${method}`, {
        get() {
          const listeners = this.listeners(method);
          for (var i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener)
              return listeners[i]._listener;
          }
          return void 0;
        },
        set(listener) {
          const listeners = this.listeners(method);
          for (var i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener)
              this.removeListener(method, listeners[i]);
          }
          this.addEventListener(method, listener);
        }
      });
    });
    WebSocket.prototype.addEventListener = EventTarget.addEventListener;
    WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;
    module.exports = WebSocket;
    function initAsClient(websocket, address, protocols, options) {
      const opts = Object.assign(
        {
          protocolVersion: protocolVersions[1],
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: true,
          followRedirects: false,
          maxRedirects: 10
        },
        options,
        {
          createConnection: void 0,
          socketPath: void 0,
          hostname: void 0,
          protocol: void 0,
          timeout: void 0,
          method: void 0,
          auth: void 0,
          host: void 0,
          path: void 0,
          port: void 0
        }
      );
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      var parsedUrl;
      if (typeof address === "object" && address.href !== void 0) {
        parsedUrl = address;
        websocket.url = address.href;
      } else {
        parsedUrl = url.URL ? new url.URL(address) : url.parse(address);
        websocket.url = address;
      }
      const isUnixSocket = parsedUrl.protocol === "ws+unix:";
      if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
        throw new Error(`Invalid URL: ${websocket.url}`);
      }
      const isSecure = parsedUrl.protocol === "wss:" || parsedUrl.protocol === "https:";
      const defaultPort = isSecure ? 443 : 80;
      const key = crypto.randomBytes(16).toString("base64");
      const get = isSecure ? https.get : http.get;
      const path = parsedUrl.search ? `${parsedUrl.pathname || "/"}${parsedUrl.search}` : parsedUrl.pathname || "/";
      var perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = Object.assign(
        {
          "Sec-WebSocket-Version": opts.protocolVersion,
          "Sec-WebSocket-Key": key,
          Connection: "Upgrade",
          Upgrade: "websocket"
        },
        opts.headers
      );
      opts.path = path;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = extension.format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols) {
        opts.headers["Sec-WebSocket-Protocol"] = protocols;
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.auth) {
        opts.auth = parsedUrl.auth;
      } else if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isUnixSocket) {
        const parts = path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      var req = websocket._req = get(opts);
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (websocket._req.aborted)
          return;
        req = websocket._req = null;
        websocket.readyState = WebSocket.CLOSING;
        websocket.emit("error", err);
        websocket.emitClose();
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          const addr = url.URL ? new url.URL(location, address) : url.resolve(address, location);
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket.CONNECTING)
          return;
        req = websocket._req = null;
        const digest = crypto.createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        const protList = (protocols || "").split(/, */);
        var protError;
        if (!protocols && serverProt) {
          protError = "Server sent a subprotocol but none was requested";
        } else if (protocols && !serverProt) {
          protError = "Server sent no subprotocol";
        } else if (serverProt && !protList.includes(serverProt)) {
          protError = "Server sent an invalid subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket.protocol = serverProt;
        if (perMessageDeflate) {
          try {
            const extensions = extension.parse(
              res.headers["sec-websocket-extensions"]
            );
            if (extensions[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
              websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            abortHandshake(
              websocket,
              socket,
              "Invalid Sec-WebSocket-Extensions header"
            );
            return;
          }
        }
        websocket.setSocket(socket, head, opts.maxPayload);
      });
    }
    function netConnect(options) {
      if (options.protocolVersion)
        options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      options.servername = options.servername || options.host;
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket.readyState = WebSocket.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream.abort();
        stream.once("abort", websocket.emitClose.bind(websocket));
        websocket.emit("error", err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._socket.removeListener("data", socketOnData);
      websocket._socket.resume();
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      this[kWebSocket]._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      websocket._socket.removeListener("data", socketOnData);
      websocket.readyState = WebSocket.CLOSING;
      websocket._closeCode = err[kStatusCode];
      websocket.emit("error", err);
      websocket._socket.destroy();
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data) {
      this[kWebSocket].emit("message", data);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("end", socketOnEnd);
      websocket.readyState = WebSocket.CLOSING;
      websocket._socket.read();
      websocket._receiver.end();
      this.removeListener("data", socketOnData);
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket.readyState = WebSocket.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      websocket.readyState = WebSocket.CLOSING;
      this.destroy();
    }
  }
});
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports, module) {
    var EventEmitter = (init_events(), __toCommonJS(events_exports));
    var crypto = (init_crypto(), __toCommonJS(crypto_exports));
    var http = (init_http(), __toCommonJS(http_exports));
    var PerMessageDeflate = require_permessage_deflate();
    var extension = require_extension();
    var WebSocket = require_websocket();
    var { GUID } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var WebSocketServer = class extends EventEmitter {
      constructor(options, callback) {
        super();
        options = Object.assign(
          {
            maxPayload: 100 * 1024 * 1024,
            perMessageDeflate: false,
            handleProtocols: null,
            clientTracking: true,
            verifyClient: null,
            noServer: false,
            backlog: null,
            server: null,
            host: null,
            path: null,
            port: null
          },
          options
        );
        if (options.port == null && !options.server && !options.noServer) {
          throw new TypeError(
            'One of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, (ws) => {
                this.emit("connection", ws, req);
              });
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking)
          this.clients = /* @__PURE__ */ new Set();
        this.options = options;
      }
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      close(cb) {
        if (cb)
          this.once("close", cb);
        if (this.clients) {
          for (const client of this.clients)
            client.terminate();
        }
        const server = this._server;
        if (server) {
          this._removeListeners();
          this._removeListeners = this._server = null;
          if (this.options.port != null) {
            server.close(() => this.emit("close"));
            return;
          }
        }
        process.nextTick(emitClose, this);
      }
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"] !== void 0 ? req.headers["sec-websocket-key"].trim() : false;
        const version = +req.headers["sec-websocket-version"];
        const extensions = {};
        if (req.method !== "GET" || req.headers.upgrade.toLowerCase() !== "websocket" || !key || !keyRegex.test(key) || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
          return abortHandshake(socket, 400);
        }
        if (this.options.perMessageDeflate) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(req.headers["sec-websocket-extensions"]);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            return abortHandshake(socket, 400);
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.connection.authorized || req.connection.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(key, extensions, req, socket, head, cb);
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(key, extensions, req, socket, head, cb);
      }
      completeUpgrade(key, extensions, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        const digest = crypto.createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new WebSocket(null);
        var protocol = req.headers["sec-websocket-protocol"];
        if (protocol) {
          protocol = protocol.split(",").map(trim);
          if (this.options.handleProtocols) {
            protocol = this.options.handleProtocols(protocol, req);
          } else {
            protocol = protocol[0];
          }
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws.protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, this.options.maxPayload);
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => this.clients.delete(ws));
        }
        cb(ws);
      }
    };
    module.exports = WebSocketServer;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      if (socket.writable) {
        message = message || http.STATUS_CODES[code];
        headers = Object.assign(
          {
            Connection: "close",
            "Content-type": "text/html",
            "Content-Length": Buffer.byteLength(message)
          },
          headers
        );
        socket.write(
          `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
        );
      }
      socket.removeListener("error", socketOnError);
      socket.destroy();
    }
    function trim(str) {
      return str.trim();
    }
  }
});
var require_ws = __commonJS({
  "node_modules/ws/index.js"(exports, module) {
    var WebSocket = require_websocket();
    WebSocket.Server = require_websocket_server();
    WebSocket.Receiver = require_receiver();
    WebSocket.Sender = require_sender();
    module.exports = WebSocket;
  }
});
var util_exports = {};
var init_util = __esm({
  "external:util"() {
    __reExport(util_exports, util_star);
  }
});
var require_DataType = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/DataType.js"(exports, module) {
    var DataType = {
      INT: 1,
      LONG: 2,
      STRING: 3,
      DATE: 4,
      TIMESTAMP: 5,
      CLASS: 6,
      DOUBLE: 7,
      FLOAT: 8,
      LIST: 9,
      MAP: 10,
      SET: 11,
      UUID: 12,
      EDGE: 13,
      PATH: 14,
      PROPERTY: 15,
      GRAPH: 16,
      VERTEX: 17,
      VERTEXPROPERTY: 18,
      BARRIER: 19,
      BINDING: 20,
      BYTECODE: 21,
      CARDINALITY: 22,
      COLUMN: 23,
      DIRECTION: 24,
      OPERATOR: 25,
      ORDER: 26,
      PICK: 27,
      POP: 28,
      LAMBDA: 29,
      P: 30,
      SCOPE: 31,
      T: 32,
      TRAVERSER: 33,
      BIGDECIMAL: 34,
      BIGINTEGER: 35,
      BYTE: 36,
      BYTEBUFFER: 37,
      SHORT: 38,
      BOOLEAN: 39,
      TEXTP: 40,
      TRAVERSALSTRATEGY: 41,
      BULKSET: 42,
      TREE: 43,
      METRICS: 44,
      TRAVERSALMETRICS: 45,
      MERGE: 46,
      CHAR: 128,
      DURATION: 129,
      INETADDRESS: 130,
      INSTANT: 131,
      LOCALDATE: 132,
      LOCALDATETIME: 133,
      LOCALTIME: 134,
      MONTHDAY: 135,
      OFFSETDATETIME: 136,
      OFFSETTIME: 137,
      PERIOD: 138,
      YEAR: 139,
      YEARMONTH: 140,
      ZONEDATETIME: 141,
      ZONEOFFSET: 142,
      CUSTOM: 0,
      UNSPECIFIED_NULL: 254
    };
    module.exports = DataType;
  }
});
var require_utils2 = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/utils.js"(exports, module) {
    var des_error = ({ serializer, args, cursor, err }) => {
      if (cursor === void 0) {
        cursor = args[0];
      }
      let cursor_tail = "";
      if (cursor instanceof Buffer) {
        if (cursor.length > 32) {
          cursor_tail = "...";
        }
        cursor = cursor.slice(0, 32).toString("hex");
      }
      const fullyQualifiedFormat = args[1];
      const nullable = args[2];
      let m = `${serializer.constructor.name}.deserialize(cursor=${cursor}${cursor_tail}`;
      if (fullyQualifiedFormat !== void 0) {
        m += `, fullyQualifiedFormat=${fullyQualifiedFormat}`;
      }
      if (nullable !== void 0) {
        m += `, nullable=${nullable}`;
      }
      m += `): ${err.message.replace(/\.$/, "")}.`;
      err.message = m;
      return err;
    };
    module.exports = {
      des_error
    };
  }
});
var require_IntSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/IntSerializer.js"(exports, module) {
    module.exports = class IntSerializer {
      get INT32_MIN() {
        return -2147483648;
      }
      get INT32_MAX() {
        return 2147483647;
      }
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.INT] = this;
      }
      canBeUsedFor(value) {
        if (typeof value !== "number") {
          return false;
        }
        if (value < this.INT32_MIN || value > this.INT32_MAX) {
          return false;
        }
        return true;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.INT, 1]);
          }
          return Buffer.from([0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.INT, 0]));
        }
        const v = Buffer.alloc(4);
        v.writeInt32BE(item);
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.INT) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 4) {
            throw new Error("unexpected {value} length");
          }
          len += 4;
          const v = cursor.readInt32BE();
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_LongSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/LongSerializer.js"(exports, module) {
    module.exports = class LongSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.LONG] = this;
      }
      canBeUsedFor() {
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.LONG, 1]);
          }
          return Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.LONG, 0]));
        }
        const v = Buffer.alloc(8);
        v.writeBigInt64BE(BigInt(item));
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.LONG) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 8) {
            throw new Error("unexpected {value} length");
          }
          len += 8;
          let v = cursor.readBigInt64BE();
          if (v < Number.MIN_SAFE_INTEGER || v > Number.MAX_SAFE_INTEGER) {
            v = parseFloat(v.toString());
          } else {
            v = Number(v);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_LongSerializerNg = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/LongSerializerNg.js"(exports, module) {
    module.exports = class LongSerializerNg {
      constructor(ioc) {
        this.ioc = ioc;
      }
      canBeUsedFor() {
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.LONG, 1]);
          }
          return Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.LONG, 0]));
        }
        const v = Buffer.alloc(8);
        v.writeBigInt64BE(BigInt(item));
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.LONG) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 8) {
            throw new Error("unexpected {value} length");
          }
          len += 8;
          const v = cursor.readBigInt64BE();
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_StringSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/StringSerializer.js"(exports, module) {
    module.exports = class StringSerializer {
      constructor(ioc, ID) {
        this.ioc = ioc;
        this.ID = ID;
        this.ioc.serializers[ID] = this;
      }
      canBeUsedFor(value) {
        return typeof value === "string";
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ID, 1]);
          }
          return this.ioc.intSerializer.serialize(0, false);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ID, 0]));
        }
        const v = Buffer.from(String(item), "utf8");
        bufs.push(this.ioc.intSerializer.serialize(v.length, false));
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true, nullable = false) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ID) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
          }
          if (fullyQualifiedFormat || nullable) {
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let length, length_len;
          try {
            ({ v: length, len: length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += length_len;
          } catch (err) {
            err.message = "{length}: " + err.message;
            throw err;
          }
          if (length < 0) {
            throw new Error("{length} is less than zero");
          }
          cursor = cursor.slice(length_len);
          if (cursor.length < length) {
            throw new Error("unexpected {text_value} length");
          }
          len += length;
          const v = cursor.toString("utf8", 0, length);
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_DateSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/DateSerializer.js"(exports, module) {
    module.exports = class DateSerializer {
      constructor(ioc, ID) {
        this.ioc = ioc;
        this.ID = ID;
        this.ioc.serializers[ID] = this;
      }
      canBeUsedFor(value) {
        return value instanceof Date;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ID, 1]);
          }
          return Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ID, 0]));
        }
        const v = Buffer.alloc(8);
        v.writeBigInt64BE(BigInt(item.getTime()));
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ID) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 8) {
            throw new Error("unexpected {value} length");
          }
          len += 8;
          const ms = cursor.readBigInt64BE();
          const v = new Date(Number(ms));
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_DoubleSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/DoubleSerializer.js"(exports, module) {
    module.exports = class DoubleSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.DOUBLE] = this;
      }
      canBeUsedFor(value) {
        return typeof value === "number" && !Number.isInteger(value);
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.DOUBLE, 1]);
          }
          return Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.DOUBLE, 0]));
        }
        const v = Buffer.alloc(8);
        v.writeDoubleBE(item);
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.DOUBLE) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 8) {
            throw new Error("unexpected {value} length");
          }
          len += 8;
          const v = cursor.readDoubleBE();
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_FloatSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/FloatSerializer.js"(exports, module) {
    module.exports = class FloatSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.FLOAT] = this;
      }
      canBeUsedFor(value) {
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.FLOAT, 1]);
          }
          return Buffer.from([0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.FLOAT, 0]));
        }
        const v = Buffer.alloc(4);
        v.writeFloatBE(item);
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.FLOAT) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 4) {
            throw new Error("unexpected {value} length");
          }
          len += 4;
          const v = cursor.readFloatBE();
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_ArraySerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/ArraySerializer.js"(exports, module) {
    module.exports = class ArraySerializer {
      constructor(ioc, ID) {
        this.ioc = ioc;
        this.ID = ID;
        this.ioc.serializers[ID] = this;
      }
      canBeUsedFor(value) {
        return Array.isArray(value);
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ID, 1]);
          }
          return Buffer.from([0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ID, 0]));
        }
        let length = item.length;
        if (length < 0) {
          length = 0;
        }
        if (length > this.ioc.intSerializer.INT32_MAX) {
          throw new Error(
            `Array length=${length} is greater than supported max_length=${this.ioc.intSerializer.INT32_MAX}.`
          );
        }
        bufs.push(this.ioc.intSerializer.serialize(length, false));
        for (let i = 0; i < length; i++) {
          bufs.push(this.ioc.anySerializer.serialize(item[i]));
        }
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ID) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let length, length_len;
          try {
            ({ v: length, len: length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += length_len;
          } catch (err) {
            err.message = "{length}: " + err.message;
            throw err;
          }
          if (length < 0) {
            throw new Error("{length} is less than zero");
          }
          cursor = cursor.slice(length_len);
          const v = [];
          for (let i = 0; i < length; i++) {
            let value, value_len;
            try {
              ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
              len += value_len;
            } catch (err) {
              err.message = `{item_${i}}: ` + err.message;
              throw err;
            }
            cursor = cursor.slice(value_len);
            v.push(value);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_MapSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/MapSerializer.js"(exports, module) {
    module.exports = class MapSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.MAP] = this;
      }
      canBeUsedFor(value) {
        if (value === null || value === void 0) {
          return false;
        }
        if (value instanceof Map) {
          return true;
        }
        if (Array.isArray(value)) {
          return false;
        }
        return typeof value === "object";
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.MAP, 1]);
          }
          return this.ioc.intSerializer.serialize(0, false);
        }
        const isMap = item instanceof Map;
        const keys = isMap ? Array.from(item.keys()) : Object.keys(item);
        let map_length = keys.length;
        if (map_length < 0) {
          map_length = 0;
        } else if (map_length > this.ioc.intSerializer.INT32_MAX) {
          map_length = this.ioc.intSerializer.INT32_MAX;
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.MAP, 0]));
        }
        bufs.push(this.ioc.intSerializer.serialize(map_length, false));
        for (let i = 0; i < map_length; i++) {
          const key = keys[i];
          const value = isMap ? item.get(key) : item[key];
          bufs.push(this.ioc.anySerializer.serialize(key), this.ioc.anySerializer.serialize(value));
        }
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.MAP) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let length, length_len;
          try {
            ({ v: length, len: length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += length_len;
          } catch (err) {
            err.message = "{length}: " + err.message;
            throw err;
          }
          if (length < 0) {
            throw new Error("{length} is less than zero");
          }
          cursor = cursor.slice(length_len);
          const v = /* @__PURE__ */ new Map();
          for (let i = 0; i < length; i++) {
            let key, key_len;
            try {
              ({ v: key, len: key_len } = this.ioc.anySerializer.deserialize(cursor));
              len += key_len;
            } catch (err) {
              err.message = `{item_${i}} key: ` + err.message;
              throw err;
            }
            cursor = cursor.slice(key_len);
            let value, value_len;
            try {
              ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
              len += value_len;
            } catch (err) {
              err.message = `{item_${i}} value: ` + err.message;
              throw err;
            }
            cursor = cursor.slice(value_len);
            v.set(key, value);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_UuidSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/UuidSerializer.js"(exports, module) {
    module.exports = class UuidSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.UUID] = this;
      }
      canBeUsedFor(value) {
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.UUID, 1]);
          }
          return Buffer.from([
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]);
        }
        const uuid_str = String(item).replace(/^urn:uuid:/, "").replace(/[{}-]/g, "");
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.UUID, 0]));
        }
        const v = Buffer.alloc(16, 0);
        for (let i = 0; i < 16 && i * 2 < uuid_str.length; i++) {
          v[i] = parseInt(uuid_str.slice(i * 2, i * 2 + 2), 16);
        }
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true, nullable = false) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.UUID) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
          }
          if (fullyQualifiedFormat || nullable) {
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 16) {
            throw new Error("unexpected {value} length");
          }
          len += 16;
          const v = cursor.slice(0, 4).toString("hex") + "-" + cursor.slice(4, 6).toString("hex") + "-" + cursor.slice(6, 8).toString("hex") + "-" + cursor.slice(8, 10).toString("hex") + "-" + cursor.slice(10, 16).toString("hex");
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_EdgeSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/EdgeSerializer.js"(exports, module) {
    var g = require_graph();
    module.exports = class EdgeSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.EDGE] = this;
      }
      canBeUsedFor(value) {
        return value instanceof g.Edge;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.EDGE, 1]);
          }
          const id = [3, 0, 0, 0, 0, 0];
          const label = [0, 0, 0, 0];
          const inVId2 = [3, 0, 0, 0, 0, 0];
          const inVLabel2 = [0, 0, 0, 0];
          const outVId2 = [3, 0, 0, 0, 0, 0];
          const outVLabel2 = [0, 0, 0, 0];
          const parent = [254, 1];
          const properties = [254, 1];
          return Buffer.from([...id, ...label, ...inVId2, ...inVLabel2, ...outVId2, ...outVLabel2, ...parent, ...properties]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.EDGE, 0]));
        }
        bufs.push(this.ioc.anySerializer.serialize(item.id));
        bufs.push(this.ioc.stringSerializer.serialize(item.label, false));
        const inVId = item.inV && item.inV.id;
        bufs.push(this.ioc.anySerializer.serialize(inVId));
        const inVLabel = item.inV && item.inV.label;
        bufs.push(this.ioc.stringSerializer.serialize(inVLabel, false));
        const outVId = item.outV && item.outV.id;
        bufs.push(this.ioc.anySerializer.serialize(outVId));
        const outVLabel = item.outV && item.outV.label;
        bufs.push(this.ioc.stringSerializer.serialize(outVLabel, false));
        bufs.push(this.ioc.unspecifiedNullSerializer.serialize(null));
        bufs.push(this.ioc.unspecifiedNullSerializer.serialize(null));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.EDGE) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let id, id_len;
          try {
            ({ v: id, len: id_len } = this.ioc.anySerializer.deserialize(cursor));
            len += id_len;
          } catch (err) {
            err.message = "{id}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(id_len);
          let label, label_len;
          try {
            ({ v: label, len: label_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += label_len;
          } catch (err) {
            err.message = "{label}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(label_len);
          let inVId, inVId_len;
          try {
            ({ v: inVId, len: inVId_len } = this.ioc.anySerializer.deserialize(cursor));
            len += inVId_len;
          } catch (err) {
            err.message = "{inVId}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(inVId_len);
          let inVLabel, inVLabel_len;
          try {
            ({ v: inVLabel, len: inVLabel_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += inVLabel_len;
          } catch (err) {
            err.message = "{inVLabel}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(inVLabel_len);
          let outVId, outVId_len;
          try {
            ({ v: outVId, len: outVId_len } = this.ioc.anySerializer.deserialize(cursor));
            len += outVId_len;
          } catch (err) {
            err.message = "{outVId}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(outVId_len);
          let outVLabel, outVLabel_len;
          try {
            ({ v: outVLabel, len: outVLabel_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += outVLabel_len;
          } catch (err) {
            err.message = "{outVLabel}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(outVLabel_len);
          let parent_len;
          try {
            ({ len: parent_len } = this.ioc.anySerializer.deserialize(cursor));
            len += parent_len;
          } catch (err) {
            err.message = "{parent}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(parent_len);
          let properties, properties_len;
          try {
            ({ v: properties, len: properties_len } = this.ioc.anySerializer.deserialize(cursor));
            len += properties_len;
          } catch (err) {
            err.message = "{properties}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(properties_len);
          const v = new g.Edge(
            id,
            new g.Vertex(outVId, outVLabel, null),
            label,
            new g.Vertex(inVId, inVLabel, null),
            properties
          );
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_PathSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/PathSerializer.js"(exports, module) {
    var g = require_graph();
    module.exports = class PathSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.PATH] = this;
      }
      canBeUsedFor(value) {
        return value instanceof g.Path;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.PATH, 1]);
          }
          return Buffer.concat([
            this.ioc.listSerializer.serialize([]),
            this.ioc.listSerializer.serialize([])
          ]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.PATH, 0]));
        }
        bufs.push(this.ioc.listSerializer.serialize(item.labels));
        bufs.push(this.ioc.listSerializer.serialize(item.objects));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.PATH) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let labels, labels_len;
          try {
            ({ v: labels, len: labels_len } = this.ioc.listSerializer.deserialize(cursor));
            len += labels_len;
          } catch (err) {
            err.message = "{labels}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(labels_len);
          let objects, objects_len;
          try {
            ({ v: objects, len: objects_len } = this.ioc.listSerializer.deserialize(cursor));
            len += objects_len;
          } catch (err) {
            err.message = "{objects}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(objects_len);
          const v = new g.Path(labels, objects);
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_PropertySerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/PropertySerializer.js"(exports, module) {
    var g = require_graph();
    module.exports = class PropertySerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.PROPERTY] = this;
      }
      canBeUsedFor(value) {
        return value instanceof g.Property;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.PROPERTY, 1]);
          }
          return Buffer.concat([
            this.ioc.stringSerializer.serialize("", false),
            this.ioc.unspecifiedNullSerializer.serialize(null),
            this.ioc.unspecifiedNullSerializer.serialize(null)
          ]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.PROPERTY, 0]));
        }
        bufs.push(this.ioc.stringSerializer.serialize(item.key, false));
        bufs.push(this.ioc.anySerializer.serialize(item.value));
        bufs.push(this.ioc.unspecifiedNullSerializer.serialize(null));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.PROPERTY) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let key, key_len;
          try {
            ({ v: key, len: key_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += key_len;
          } catch (err) {
            err.message = "{key}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(key_len);
          let value, value_len;
          try {
            ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
            len += value_len;
          } catch (err) {
            err.message = "{value}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(value_len);
          let parent_len;
          try {
            ({ len: parent_len } = this.ioc.unspecifiedNullSerializer.deserialize(cursor));
            len += parent_len;
          } catch (err) {
            err.message = "{parent}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(parent_len);
          const v = new g.Property(key, value);
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_VertexSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/VertexSerializer.js"(exports, module) {
    var g = require_graph();
    module.exports = class VertexSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.VERTEX] = this;
      }
      canBeUsedFor(value) {
        return value instanceof g.Vertex;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.VERTEX, 1]);
          }
          const id = [3, 0, 0, 0, 0, 0];
          const label = [0, 0, 0, 0];
          const properties = [254, 1];
          return Buffer.from([...id, ...label, ...properties]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.VERTEX, 0]));
        }
        bufs.push(this.ioc.anySerializer.serialize(item.id));
        bufs.push(this.ioc.stringSerializer.serialize(item.label, false));
        bufs.push(this.ioc.anySerializer.serialize(item.properties));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.VERTEX) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let id, id_len;
          try {
            ({ v: id, len: id_len } = this.ioc.anySerializer.deserialize(cursor));
            len += id_len;
          } catch (err) {
            err.message = "{id}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(id_len);
          let label, label_len;
          try {
            ({ v: label, len: label_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += label_len;
          } catch (err) {
            err.message = "{label}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(label_len);
          let properties, properties_len;
          try {
            ({ v: properties, len: properties_len } = this.ioc.anySerializer.deserialize(cursor));
            len += properties_len;
          } catch (err) {
            err.message = "{properties}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(properties_len);
          const v = new g.Vertex(id, label, properties);
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_VertexPropertySerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/VertexPropertySerializer.js"(exports, module) {
    var g = require_graph();
    module.exports = class VertexPropertySerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.VERTEXPROPERTY] = this;
      }
      canBeUsedFor(value) {
        return value instanceof g.VertexProperty;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.VERTEXPROPERTY, 1]);
          }
          return Buffer.concat([
            this.ioc.unspecifiedNullSerializer.serialize(null),
            this.ioc.stringSerializer.serialize("", false),
            this.ioc.unspecifiedNullSerializer.serialize(null),
            this.ioc.unspecifiedNullSerializer.serialize(null),
            this.ioc.unspecifiedNullSerializer.serialize(null)
          ]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.VERTEXPROPERTY, 0]));
        }
        bufs.push(this.ioc.anySerializer.serialize(item.id));
        bufs.push(this.ioc.stringSerializer.serialize(item.label, false));
        bufs.push(this.ioc.anySerializer.serialize(item.value));
        bufs.push(this.ioc.unspecifiedNullSerializer.serialize(null));
        bufs.push(this.ioc.anySerializer.serialize(item.properties));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.VERTEXPROPERTY) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let id, id_len;
          try {
            ({ v: id, len: id_len } = this.ioc.anySerializer.deserialize(cursor));
            len += id_len;
          } catch (err) {
            err.message = "{id}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(id_len);
          let label, label_len;
          try {
            ({ v: label, len: label_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += label_len;
          } catch (err) {
            err.message = "{label}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(label_len);
          let value, value_len;
          try {
            ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
            len += value_len;
          } catch (err) {
            err.message = "{value}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(value_len);
          let parent_len;
          try {
            ({ len: parent_len } = this.ioc.unspecifiedNullSerializer.deserialize(cursor));
            len += parent_len;
          } catch (err) {
            err.message = "{parent}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(parent_len);
          let properties, properties_len;
          try {
            ({ v: properties, len: properties_len } = this.ioc.unspecifiedNullSerializer.deserialize(cursor));
            len += properties_len;
          } catch (err) {
            err.message = "{properties}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(properties_len);
          const v = new g.VertexProperty(id, label, value, properties);
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_BytecodeSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/BytecodeSerializer.js"(exports, module) {
    var Bytecode = require_bytecode();
    var t = require_traversal();
    module.exports = class BytecodeSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.BYTECODE] = this;
      }
      canBeUsedFor(value) {
        return value instanceof Bytecode || value instanceof t.Traversal;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.BYTECODE, 1]);
          }
          const steps_length = [0, 0, 0, 0];
          const sources_length = [0, 0, 0, 0];
          return Buffer.from([...steps_length, ...sources_length]);
        }
        if (item instanceof t.Traversal) {
          item = item.getBytecode();
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.BYTECODE, 0]));
        }
        bufs.push(this.ioc.intSerializer.serialize(item.stepInstructions.length, false));
        for (let i = 0; i < item.stepInstructions.length; i++) {
          const step = item.stepInstructions[i];
          const name = step[0];
          const values_length = step.length - 1;
          bufs.push(this.ioc.stringSerializer.serialize(name, false));
          bufs.push(this.ioc.intSerializer.serialize(values_length, false));
          for (let j = 0; j < values_length; j++) {
            bufs.push(this.ioc.anySerializer.serialize(step[1 + j], true));
          }
        }
        bufs.push(this.ioc.intSerializer.serialize(item.sourceInstructions.length, false));
        for (let i = 0; i < item.sourceInstructions.length; i++) {
          const source = item.sourceInstructions[i];
          const name = source[0];
          const values_length = source.length - 1;
          bufs.push(this.ioc.stringSerializer.serialize(name, false));
          bufs.push(this.ioc.intSerializer.serialize(values_length, false));
          for (let j = 0; j < values_length; j++) {
            bufs.push(this.ioc.anySerializer.serialize(source[1 + j], true));
          }
        }
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.BYTECODE) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          const v = new Bytecode();
          let steps_length, steps_length_len;
          try {
            ({ v: steps_length, len: steps_length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += steps_length_len;
          } catch (err) {
            err.message = "{steps_length}: " + err.message;
            throw err;
          }
          if (steps_length < 0) {
            throw new Error("{steps_length} is less than zero");
          }
          cursor = cursor.slice(steps_length_len);
          for (let i = 0; i < steps_length; i++) {
            let name, name_len;
            try {
              ({ v: name, len: name_len } = this.ioc.stringSerializer.deserialize(cursor, false));
              len += name_len;
            } catch (err) {
              err.message = `{step_${i}} {name}: ` + err.message;
              throw err;
            }
            cursor = cursor.slice(name_len);
            let values_length, values_length_len;
            try {
              ({ v: values_length, len: values_length_len } = this.ioc.intSerializer.deserialize(cursor, false));
              len += values_length_len;
            } catch (err) {
              err.message = `{step_${i}} {values_length}: ` + err.message;
              throw err;
            }
            if (values_length < 0) {
              throw new Error(`{step_${i}} {values_length} is less than zero`);
            }
            cursor = cursor.slice(values_length_len);
            const values = [];
            let value, value_len;
            for (let j = 0; j < values_length; j++) {
              try {
                ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
                len += value_len;
                values.push(value);
              } catch (err) {
                err.message = `{step_${i}} {value_${j}}: ` + err.message;
                throw err;
              }
              cursor = cursor.slice(value_len);
            }
            v.addStep(name, values);
          }
          let sources_length, sources_length_len;
          try {
            ({ v: sources_length, len: sources_length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += sources_length_len;
          } catch (err) {
            err.message = "{sources_length}: " + err.message;
            throw err;
          }
          if (sources_length < 0) {
            throw new Error("{sources_length} is less than zero");
          }
          cursor = cursor.slice(sources_length_len);
          for (let i = 0; i < sources_length; i++) {
            let name, name_len;
            try {
              ({ v: name, len: name_len } = this.ioc.stringSerializer.deserialize(cursor, false));
              len += name_len;
            } catch (err) {
              err.message = `{source_${i}} {name}: ` + err.message;
              throw err;
            }
            cursor = cursor.slice(name_len);
            let values_length, values_length_len;
            try {
              ({ v: values_length, len: values_length_len } = this.ioc.intSerializer.deserialize(cursor, false));
              len += values_length_len;
            } catch (err) {
              err.message = `{source_${i}} {values_length}: ` + err.message;
              throw err;
            }
            if (values_length < 0) {
              throw new Error(`{source_${i}} {values_length} is less than zero`);
            }
            cursor = cursor.slice(values_length_len);
            const values = [];
            let value, value_len;
            for (let j = 0; j < values_length; j++) {
              try {
                ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
                len += value_len;
                values.push(value);
              } catch (err) {
                err.message = `{source_${i}} {value_${j}}: ` + err.message;
                throw err;
              }
              cursor = cursor.slice(value_len);
            }
            v.addSource(name, values);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_PSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/PSerializer.js"(exports, module) {
    var t = require_traversal();
    module.exports = class PSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.P] = this;
      }
      canBeUsedFor(value) {
        return value instanceof t.P;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.P, 1]);
          }
          const name = [0, 0, 0, 0];
          const values_length = [0, 0, 0, 0];
          return Buffer.from([...name, ...values_length]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.P, 0]));
        }
        bufs.push(this.ioc.stringSerializer.serialize(item.operator, false));
        let list;
        if (item.other === void 0 || item.other === null) {
          if (Array.isArray(item.value)) {
            list = item.value;
          } else {
            list = [item.value];
          }
        } else {
          list = [item.value, item.other];
        }
        bufs.push(this.ioc.listSerializer.serialize(list, false));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.P) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let name, name_len;
          try {
            ({ v: name, len: name_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += name_len;
          } catch (err) {
            err.message = "{name}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(name_len);
          let values, values_len;
          try {
            ({ v: values, len: values_len } = this.ioc.listSerializer.deserialize(cursor, false));
            len += values_len;
          } catch (err) {
            err.message = "{values}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(values_len);
          if (values.length < 1) {
            return { v: new t.P(""), len };
          }
          let v;
          const P_static = t.P[name];
          if (typeof P_static === "function") {
            v = P_static(...values);
          } else {
            v = new t.P(name, ...values);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_TraverserSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/TraverserSerializer.js"(exports, module) {
    var t = require_traversal();
    module.exports = class TraverserSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.TRAVERSER] = this;
      }
      canBeUsedFor(value) {
        return value instanceof t.Traverser;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.TRAVERSER, 1]);
          }
          const bulk = [0, 0, 0, 0, 0, 0, 0, 1];
          const value = [254, 1];
          return Buffer.from([...bulk, ...value]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.TRAVERSER, 0]));
        }
        bufs.push(this.ioc.longSerializer.serialize(item.bulk, false));
        bufs.push(this.ioc.anySerializer.serialize(item.object));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.TRAVERSER) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let bulk, bulk_len;
          try {
            ({ v: bulk, len: bulk_len } = this.ioc.longSerializer.deserialize(cursor, false));
            len += bulk_len;
          } catch (err) {
            err.message = "{bulk}: " + err.message;
            throw err;
          }
          if (bulk < 0) {
            throw new Error("{bulk} is less than zero");
          }
          cursor = cursor.slice(bulk_len);
          let value, value_len;
          try {
            ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
            len += value_len;
          } catch (err) {
            err.message = "{value}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(value_len);
          const v = new t.Traverser(value, bulk);
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_EnumSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/EnumSerializer.js"(exports, module) {
    var t = require_traversal();
    module.exports = class EnumSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        const to_orig_enum = (obj) => {
          const r = {};
          Object.values(obj).forEach((e) => r[e.elementName] = e);
          return r;
        };
        const DT = ioc.DataType;
        this.types = [
          { name: "Barrier", code: DT.BARRIER, enum: to_orig_enum(t.barrier) },
          { name: "Cardinality", code: DT.CARDINALITY, enum: to_orig_enum(t.cardinality) },
          { name: "Column", code: DT.COLUMN, enum: to_orig_enum(t.column) },
          { name: "Direction", code: DT.DIRECTION, enum: to_orig_enum(t.direction) },
          { name: "Merge", code: DT.MERGE, enum: to_orig_enum(t.merge) },
          { name: "Operator", code: DT.OPERATOR, enum: to_orig_enum(t.operator) },
          { name: "Order", code: DT.ORDER, enum: to_orig_enum(t.order) },
          { name: "Pick", code: DT.PICK, enum: to_orig_enum(t.pick) },
          { name: "Pop", code: DT.POP, enum: to_orig_enum(t.pop) },
          { name: "Scope", code: DT.SCOPE, enum: to_orig_enum(t.scope) },
          { name: "T", code: DT.T, enum: to_orig_enum(t.t) }
        ];
        this.byname = {};
        this.bycode = {};
        for (const type of this.types) {
          this.ioc.serializers[type.code] = this;
          this.byname[type.name] = type;
          this.bycode[type.code] = type;
        }
      }
      canBeUsedFor(value) {
        if (!(value instanceof t.EnumValue)) {
          return false;
        }
        if (!this.byname[value.typeName]) {
          throw new Error(`EnumSerializer.serialize: typeName=${value.typeName} is not supported.`);
        }
        return true;
      }
      serialize(item, fullyQualifiedFormat = true) {
        const type = this.byname[item.typeName];
        if (item.elementName === void 0 || item.elementName === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([type.code, 1]);
          }
          return Buffer.from([this.ioc.DataType.STRING, 0, 0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([type.code, 0]));
        }
        bufs.push(this.ioc.stringSerializer.serialize(item.elementName, true));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          let type = void 0;
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            type = this.bycode[type_code];
            if (!type) {
              throw new Error(`unexpected {type_code}=${type_code}`);
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let elementName, elementName_len;
          try {
            ({ v: elementName, len: elementName_len } = this.ioc.stringSerializer.deserialize(cursor, true));
            len += elementName_len;
          } catch (err) {
            err.message = "elementName: " + err.message;
            throw err;
          }
          cursor = cursor.slice(elementName_len);
          let v;
          if (!type) {
            v = new t.EnumValue(void 0, elementName);
          } else {
            v = type.enum[elementName];
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_LambdaSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/LambdaSerializer.js"(exports, module) {
    var { valueKey, LambdaSerializer: GraphsonLambdaSerializer } = require_type_serializers();
    module.exports = class LambdaSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.graphsonLambdaSerializer = new GraphsonLambdaSerializer();
      }
      canBeUsedFor(value) {
        return this.graphsonLambdaSerializer.canBeUsedFor(value);
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.LAMBDA, 1]);
          }
          const language2 = [0, 0, 0, 0];
          const script2 = [0, 0, 0, 0];
          const arguments_length = [0, 0, 0, 0];
          return Buffer.from([...language2, ...script2, ...arguments_length]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.LAMBDA, 0]));
        }
        const graphson = this.graphsonLambdaSerializer.serialize(item);
        const language = graphson[valueKey].language;
        const script = graphson[valueKey].script;
        const arguments_ = graphson[valueKey]["arguments"];
        bufs.push(this.ioc.stringSerializer.serialize(language, false));
        bufs.push(this.ioc.stringSerializer.serialize(script, false));
        bufs.push(this.ioc.intSerializer.serialize(arguments_, false));
        return Buffer.concat(bufs);
      }
    };
  }
});
var require_BigIntegerSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/BigIntegerSerializer.js"(exports, module) {
    module.exports = class BigIntegerSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.BIGINTEGER] = this;
      }
      canBeUsedFor(value) {
        return typeof value === "bigint";
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.BIGINTEGER, 1]);
          }
          return Buffer.from([0, 0, 0, 1, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.BIGINTEGER, 0]));
        }
        let v;
        if (item >= 0) {
          let hex_str = item.toString(16);
          if (hex_str.length % 2 !== 0) {
            hex_str = "0" + hex_str;
          }
          if (Number.parseInt(hex_str[0], 16) > 7) {
            hex_str = "00" + hex_str;
          }
          v = Buffer.from(hex_str, "hex");
        } else {
          let hex_str = (-item).toString(16);
          const bytes = (hex_str.length + hex_str.length % 2) / 2;
          let N = BigInt(bytes) * BigInt(8);
          const INTN_MIN = -(BigInt(2) ** (N - BigInt(1)));
          if (item < INTN_MIN) {
            N += BigInt(8);
          }
          const twos_complement = BigInt(2) ** N + item;
          hex_str = twos_complement.toString(16);
          if (hex_str.length % 2 !== 0) {
            hex_str = "0" + hex_str;
          }
          v = Buffer.from(hex_str, "hex");
        }
        bufs.push(this.ioc.intSerializer.serialize(v.length, false));
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.BIGINTEGER) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let length, length_len;
          try {
            ({ v: length, len: length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += length_len;
          } catch (err) {
            err.message = "{length}: " + err.message;
            throw err;
          }
          if (length < 1) {
            throw new Error(`{length}=${length} is less than one`);
          }
          cursor = cursor.slice(length_len);
          len += length;
          cursor = cursor.slice(0, length);
          let v = BigInt(`0x${cursor.toString("hex")}`);
          const is_sign_bit_set = (cursor[0] & 128) === 128;
          if (is_sign_bit_set) {
            v = BigInt.asIntN(length * 8, v);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_ByteSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/ByteSerializer.js"(exports, module) {
    module.exports = class ByteSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.BYTE] = this;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.BYTE, 1]);
          }
          return Buffer.from([0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.BYTE, 0]));
        }
        const v = Buffer.alloc(1);
        v.writeUInt8(item);
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.BYTE) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 1) {
            throw new Error("unexpected {value} length");
          }
          len += 1;
          const v = cursor.readUInt8();
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_ByteBufferSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/ByteBufferSerializer.js"(exports, module) {
    module.exports = class ByteBufferSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.BYTEBUFFER] = this;
      }
      canBeUsedFor(value) {
        return value instanceof Buffer;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.BYTEBUFFER, 1]);
          }
          return Buffer.from([0, 0, 0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.BYTEBUFFER, 0]));
        }
        let length = item.length;
        if (length < 0) {
          length = 0;
        }
        if (length > this.ioc.intSerializer.INT32_MAX) {
          throw new Error(
            `Buffer length=${length} is greater than supported max_length=${this.ioc.intSerializer.INT32_MAX}.`
          );
        }
        bufs.push(this.ioc.intSerializer.serialize(length, false));
        bufs.push(item);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.BYTEBUFFER) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let length, length_len;
          try {
            ({ v: length, len: length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += length_len;
          } catch (err) {
            err.message = "{length}: " + err.message;
            throw err;
          }
          if (length < 0) {
            throw new Error("{length} is less than zero");
          }
          cursor = cursor.slice(length_len);
          if (length !== cursor.length) {
            throw new Error(`{value}: unexpected actual {value} length=${cursor.length} when {length}=${length}`);
          }
          const v = cursor.slice(0, length);
          len += length;
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_ShortSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/ShortSerializer.js"(exports, module) {
    module.exports = class ShortSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.SHORT] = this;
      }
      canBeUsedFor(value) {
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.SHORT, 1]);
          }
          return Buffer.from([0, 0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.SHORT, 0]));
        }
        const v = Buffer.alloc(2);
        v.writeInt16BE(item);
        bufs.push(v);
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.SHORT) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 2) {
            throw new Error("unexpected {value} length");
          }
          len += 2;
          const v = cursor.readInt16BE();
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_BooleanSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/BooleanSerializer.js"(exports, module) {
    module.exports = class BooleanSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.BOOLEAN] = this;
      }
      canBeUsedFor(value) {
        return typeof value === "boolean";
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.BOOLEAN, 1]);
          }
          return Buffer.from([0]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.BOOLEAN, 0]));
        }
        bufs.push(Buffer.from([item ? 1 : 0]));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.BOOLEAN) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          if (cursor.length < 1) {
            throw new Error("unexpected {value} length");
          }
          len += 1;
          let v = cursor.readUInt8();
          if (v !== 0 && v !== 1) {
            throw new Error(`unexpected boolean byte=${v}`);
          }
          v = v === 1;
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_TextPSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/TextPSerializer.js"(exports, module) {
    var t = require_traversal();
    module.exports = class TextPSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.TEXTP] = this;
      }
      canBeUsedFor(value) {
        return value instanceof t.TextP;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.TEXTP, 1]);
          }
          const name = [0, 0, 0, 0];
          const values_length = [0, 0, 0, 0];
          return Buffer.from([...name, ...values_length]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.TEXTP, 0]));
        }
        bufs.push(this.ioc.stringSerializer.serialize(item.operator, false));
        let list;
        if (item.other === void 0 || item.other === null) {
          if (Array.isArray(item.value)) {
            list = item.value;
          } else {
            list = [item.value];
          }
        } else {
          list = [item.value, item.other];
        }
        bufs.push(this.ioc.listSerializer.serialize(list, false));
        return Buffer.concat(bufs);
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.TEXTP) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let name, name_len;
          try {
            ({ v: name, len: name_len } = this.ioc.stringSerializer.deserialize(cursor, false));
            len += name_len;
          } catch (err) {
            err.message = "{name}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(name_len);
          let values, values_len;
          try {
            ({ v: values, len: values_len } = this.ioc.listSerializer.deserialize(cursor, false));
            len += values_len;
          } catch (err) {
            err.message = "{values}: " + err.message;
            throw err;
          }
          cursor = cursor.slice(values_len);
          if (values.length < 1) {
            return { v: new t.TextP(""), len };
          }
          let v;
          const TextP_static = t.TextP[name];
          if (typeof TextP_static === "function") {
            v = TextP_static(...values);
          } else {
            v = new t.TextP(name, ...values);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_TraversalStrategySerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/TraversalStrategySerializer.js"(exports, module) {
    var { TraversalStrategySerializer: GraphsonTraversalStrategySerializer } = require_type_serializers();
    module.exports = class TraversalStrategySerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.graphsonTraversalStrategySerializer = new GraphsonTraversalStrategySerializer();
      }
      canBeUsedFor(value) {
        return this.graphsonTraversalStrategySerializer.canBeUsedFor(value);
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (item === void 0 || item === null) {
          if (fullyQualifiedFormat) {
            return Buffer.from([this.ioc.DataType.TRAVERSALSTRATEGY, 1]);
          }
          const strategy_class2 = [0, 0, 0, 0];
          const configuration = [0, 0, 0, 0];
          return Buffer.from([...strategy_class2, ...configuration]);
        }
        const bufs = [];
        if (fullyQualifiedFormat) {
          bufs.push(Buffer.from([this.ioc.DataType.TRAVERSALSTRATEGY, 0]));
        }
        const strategy_class = item.fqcn;
        const conf = {};
        for (const k in item.configuration) {
          if (item.configuration.hasOwnProperty(k)) {
            conf[k] = item.configuration[k];
          }
        }
        bufs.push(this.ioc.classSerializer.serialize(strategy_class, false));
        bufs.push(this.ioc.mapSerializer.serialize(conf, false));
        return Buffer.concat(bufs);
      }
    };
  }
});
var require_BulkSetSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/BulkSetSerializer.js"(exports, module) {
    module.exports = class BulkSetSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.BULKSET] = this;
      }
      deserialize(buffer, fullyQualifiedFormat = true) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          if (fullyQualifiedFormat) {
            const type_code = cursor.readUInt8();
            len++;
            if (type_code !== this.ioc.DataType.BULKSET) {
              throw new Error("unexpected {type_code}");
            }
            cursor = cursor.slice(1);
            if (cursor.length < 1) {
              throw new Error("{value_flag} is missing");
            }
            const value_flag = cursor.readUInt8();
            len++;
            if (value_flag === 1) {
              return { v: null, len };
            }
            if (value_flag !== 0) {
              throw new Error("unexpected {value_flag}");
            }
            cursor = cursor.slice(1);
          }
          let length, length_len;
          try {
            ({ v: length, len: length_len } = this.ioc.intSerializer.deserialize(cursor, false));
            len += length_len;
          } catch (err) {
            err.message = "{length}: " + err.message;
            throw err;
          }
          if (length < 0) {
            throw new Error("{length} is less than zero");
          }
          cursor = cursor.slice(length_len);
          let v = new Array();
          for (let i = 0; i < length; i++) {
            let value, value_len;
            try {
              ({ v: value, len: value_len } = this.ioc.anySerializer.deserialize(cursor));
              len += value_len;
            } catch (err) {
              err.message = `{item_${i}} value: ` + err.message;
              throw err;
            }
            cursor = cursor.slice(value_len);
            let bulk, bulk_len;
            try {
              ({ v: bulk, len: bulk_len } = this.ioc.longSerializer.deserialize(cursor, false));
              len += bulk_len;
            } catch (err) {
              err.message = `{item_${i}} bulk: ` + err.message;
              throw err;
            }
            if (bulk < 0) {
              throw new Error(`{item_${i}}: bulk is less than zero`);
            }
            if (bulk > 4294967295) {
              throw new Error(`{item_${i}}: bulk is greater than 2^32-1`);
            }
            cursor = cursor.slice(bulk_len);
            bulk = Number(bulk);
            const item = new Array(bulk).fill(value);
            v = v.concat(item);
          }
          return { v, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_UnspecifiedNullSerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/UnspecifiedNullSerializer.js"(exports, module) {
    module.exports = class UnspecifiedNullSerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.ioc.serializers[ioc.DataType.UNSPECIFIED_NULL] = this;
      }
      canBeUsedFor(value) {
        return value === null || value === void 0;
      }
      serialize(item) {
        return Buffer.from([this.ioc.DataType.UNSPECIFIED_NULL, 1]);
      }
      deserialize(buffer) {
        let len = 0;
        let cursor = buffer;
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          const type_code = cursor.readUInt8();
          len++;
          if (type_code !== this.ioc.DataType.UNSPECIFIED_NULL) {
            throw new Error("unexpected {type_code}");
          }
          cursor = cursor.slice(1);
          if (cursor.length < 1) {
            throw new Error("{value_flag} is missing");
          }
          const value_flag = cursor.readUInt8();
          len++;
          if (value_flag !== 1) {
            throw new Error("unexpected {value_flag}");
          }
          cursor = cursor.slice(1);
          return { v: null, len };
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, cursor, err });
        }
      }
    };
  }
});
var require_NumberSerializationStrategy = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/NumberSerializationStrategy.js"(exports, module) {
    module.exports = class NumberSerializationStrategy {
      constructor(ioc) {
        this.ioc = ioc;
      }
      canBeUsedFor(value) {
        if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) {
          return true;
        }
        if (typeof value === "number") {
          return true;
        }
        if (typeof value === "bigint") {
          return true;
        }
        return false;
      }
      serialize(item, fullyQualifiedFormat = true) {
        if (typeof item === "number") {
          if (Number.isNaN(item) || item === Number.POSITIVE_INFINITY || item === Number.NEGATIVE_INFINITY || !Number.isInteger(item)) {
            return this.ioc.doubleSerializer.serialize(item, fullyQualifiedFormat);
          }
          if (item >= -2147483648 && item <= 2147483647) {
            return this.ioc.intSerializer.serialize(item, fullyQualifiedFormat);
          }
          return this.ioc.longSerializer.serialize(item, fullyQualifiedFormat);
        }
        if (typeof item === "bigint") {
          return this.ioc.bigIntegerSerializer.serialize(item, fullyQualifiedFormat);
        }
      }
    };
  }
});
var require_AnySerializer = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/AnySerializer.js"(exports, module) {
    module.exports = class AnySerializer {
      constructor(ioc) {
        this.ioc = ioc;
        this.serializers = [
          ioc.unspecifiedNullSerializer,
          ioc.numberSerializationStrategy,
          ioc.booleanSerializer,
          ioc.dateSerializer,
          ioc.bytecodeSerializer,
          ioc.pSerializer,
          ioc.traverserSerializer,
          ioc.enumSerializer,
          ioc.listSerializer,
          ioc.uuidSerializer,
          ioc.edgeSerializer,
          ioc.pathSerializer,
          ioc.propertySerializer,
          ioc.vertexSerializer,
          ioc.vertexPropertySerializer,
          ioc.stringSerializer,
          ioc.textPSerializer,
          ioc.traversalStrategySerializer,
          ioc.byteBufferSerializer,
          ioc.lambdaSerializer,
          ioc.mapSerializer
        ];
      }
      getSerializerCanBeUsedFor(item) {
        for (let i = 0; i < this.serializers.length; i++) {
          if (this.serializers[i].canBeUsedFor(item)) {
            return this.serializers[i];
          }
        }
        throw new Error(
          `No serializer found to support item where typeof(item)='${typeof item}' and String(item)='${String(item)}'.`
        );
      }
      serialize(item, fullyQualifiedFormat = true) {
        return this.getSerializerCanBeUsedFor(item).serialize(item, fullyQualifiedFormat);
      }
      deserialize(buffer) {
        try {
          if (buffer === void 0 || buffer === null || !(buffer instanceof Buffer)) {
            throw new Error("buffer is missing");
          }
          if (buffer.length < 1) {
            throw new Error("buffer is empty");
          }
          const type_code = buffer.readUInt8();
          const serializer = this.ioc.serializers[type_code];
          if (!serializer) {
            throw new Error("unknown {type_code}");
          }
          return serializer.deserialize(buffer);
        } catch (err) {
          throw this.ioc.utils.des_error({ serializer: this, args: arguments, err });
        }
      }
    };
  }
});
var require_GraphBinaryReader = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/GraphBinaryReader.js"(exports, module) {
    module.exports = class GraphBinaryReader {
      constructor(ioc) {
        this.ioc = ioc;
      }
      readResponse(buffer) {
        if (buffer === void 0 || buffer === null) {
          throw new Error("Buffer is missing.");
        }
        if (!(buffer instanceof Buffer)) {
          throw new Error("Not an instance of Buffer.");
        }
        if (buffer.length < 1) {
          throw new Error("Buffer is empty.");
        }
        const response = { status: {}, result: {} };
        let cursor = buffer;
        let len;
        const version = cursor[0];
        if (version !== 129) {
          throw new Error(`Unsupported version '${version}'.`);
        }
        cursor = cursor.slice(1);
        ({ v: response.requestId, len } = this.ioc.uuidSerializer.deserialize(cursor, false, true));
        cursor = cursor.slice(len);
        ({ v: response.status.code, len } = this.ioc.intSerializer.deserialize(cursor, false));
        cursor = cursor.slice(len);
        ({ v: response.status.message, len } = this.ioc.stringSerializer.deserialize(cursor, false, true));
        cursor = cursor.slice(len);
        ({ v: response.status.attributes, len } = this.ioc.mapSerializer.deserialize(cursor, false));
        cursor = cursor.slice(len);
        ({ v: response.result.meta, len } = this.ioc.mapSerializer.deserialize(cursor, false));
        cursor = cursor.slice(len);
        ({ v: response.result.data } = this.ioc.anySerializer.deserialize(cursor));
        return response;
      }
    };
  }
});
var require_GraphBinaryWriter = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/internals/GraphBinaryWriter.js"(exports, module) {
    module.exports = class GraphBinaryWriter {
      constructor(ioc) {
        this.ioc = ioc;
      }
      writeRequest({ requestId, op, processor, args }) {
        const bufs = [
          Buffer.from([129]),
          this.ioc.uuidSerializer.serialize(requestId, false),
          this.ioc.stringSerializer.serialize(op, false),
          this.ioc.stringSerializer.serialize(processor, false),
          this.ioc.mapSerializer.serialize(args, false)
        ];
        return Buffer.concat(bufs);
      }
    };
  }
});
var require_GraphBinary = __commonJS({
  "node_modules/gremlin/lib/structure/io/binary/GraphBinary.js"(exports, module) {
    var ioc = {};
    ioc.DataType = require_DataType();
    ioc.utils = require_utils2();
    ioc.serializers = {};
    ioc.intSerializer = new (require_IntSerializer())(ioc);
    ioc.longSerializer = new (require_LongSerializer())(ioc);
    ioc.longSerializerNg = new (require_LongSerializerNg())(ioc);
    ioc.stringSerializer = new (require_StringSerializer())(ioc, ioc.DataType.STRING);
    ioc.dateSerializer = new (require_DateSerializer())(ioc, ioc.DataType.DATE);
    ioc.timestampSerializer = new (require_DateSerializer())(ioc, ioc.DataType.TIMESTAMP);
    ioc.classSerializer = new (require_StringSerializer())(ioc, ioc.DataType.CLASS);
    ioc.doubleSerializer = new (require_DoubleSerializer())(ioc);
    ioc.floatSerializer = new (require_FloatSerializer())(ioc);
    ioc.listSerializer = new (require_ArraySerializer())(ioc, ioc.DataType.LIST);
    ioc.mapSerializer = new (require_MapSerializer())(ioc);
    ioc.setSerializer = new (require_ArraySerializer())(ioc, ioc.DataType.SET);
    ioc.uuidSerializer = new (require_UuidSerializer())(ioc);
    ioc.edgeSerializer = new (require_EdgeSerializer())(ioc);
    ioc.pathSerializer = new (require_PathSerializer())(ioc);
    ioc.propertySerializer = new (require_PropertySerializer())(ioc);
    ioc.vertexSerializer = new (require_VertexSerializer())(ioc);
    ioc.vertexPropertySerializer = new (require_VertexPropertySerializer())(ioc);
    ioc.bytecodeSerializer = new (require_BytecodeSerializer())(ioc);
    ioc.pSerializer = new (require_PSerializer())(ioc);
    ioc.traverserSerializer = new (require_TraverserSerializer())(ioc);
    ioc.enumSerializer = new (require_EnumSerializer())(ioc);
    ioc.lambdaSerializer = new (require_LambdaSerializer())(ioc);
    ioc.bigIntegerSerializer = new (require_BigIntegerSerializer())(ioc);
    ioc.byteSerializer = new (require_ByteSerializer())(ioc);
    ioc.byteBufferSerializer = new (require_ByteBufferSerializer())(ioc);
    ioc.shortSerializer = new (require_ShortSerializer())(ioc);
    ioc.booleanSerializer = new (require_BooleanSerializer())(ioc);
    ioc.textPSerializer = new (require_TextPSerializer())(ioc);
    ioc.traversalStrategySerializer = new (require_TraversalStrategySerializer())(ioc);
    ioc.bulkSetSerializer = new (require_BulkSetSerializer())(ioc);
    ioc.unspecifiedNullSerializer = new (require_UnspecifiedNullSerializer())(ioc);
    ioc.numberSerializationStrategy = new (require_NumberSerializationStrategy())(ioc);
    ioc.anySerializer = new (require_AnySerializer())(ioc);
    ioc.graphBinaryReader = new (require_GraphBinaryReader())(ioc);
    ioc.graphBinaryWriter = new (require_GraphBinaryWriter())(ioc);
    module.exports = ioc;
  }
});
var require_result_set = __commonJS({
  "node_modules/gremlin/lib/driver/result-set.js"(exports, module) {
    var util = (init_util(), __toCommonJS(util_exports));
    var inspect = util.inspect.custom || "inspect";
    var utils = require_utils();
    var emptyMap = Object.freeze(new utils.ImmutableMap());
    var ResultSet = class {
      constructor(items, attributes) {
        if (!Array.isArray(items)) {
          throw new TypeError("items must be an Array instance");
        }
        this._items = items;
        this.attributes = attributes || emptyMap;
        this.length = items.length;
      }
      [Symbol.iterator]() {
        return this._items[Symbol.iterator]();
      }
      [inspect]() {
        return this._items;
      }
      toArray() {
        return this._items;
      }
      first() {
        const item = this._items[0];
        return item !== void 0 ? item : null;
      }
    };
    module.exports = ResultSet;
  }
});
var require_response_error = __commonJS({
  "node_modules/gremlin/lib/driver/response-error.js"(exports, module) {
    var ResponseError = class extends Error {
      constructor(message, responseStatus) {
        super(message);
        this.name = "ResponseError";
        this.statusCode = responseStatus.code;
        this.statusMessage = responseStatus.message;
        this.statusAttributes = responseStatus.attributes || {};
      }
    };
    module.exports = ResponseError;
  }
});
var require_connection = __commonJS({
  "node_modules/gremlin/lib/driver/connection.js"(exports, module) {
    var EventEmitter = (init_events(), __toCommonJS(events_exports));
    var Stream = (init_stream(), __toCommonJS(stream_exports));
    var WebSocket = require_ws();
    var util = (init_util(), __toCommonJS(util_exports));
    var utils = require_utils();
    var serializer = require_graph_serializer();
    var { graphBinaryReader, graphBinaryWriter } = require_GraphBinary();
    var ResultSet = require_result_set();
    var ResponseError = require_response_error();
    var responseStatusCode = {
      success: 200,
      noContent: 204,
      partialContent: 206,
      authenticationChallenge: 407
    };
    var defaultMimeType = "application/vnd.gremlin-v3.0+json";
    var graphSON2MimeType = "application/vnd.gremlin-v2.0+json";
    var graphBinaryMimeType = "application/vnd.graphbinary-v1.0";
    var pingIntervalDelay = 60 * 1e3;
    var pongTimeoutDelay = 30 * 1e3;
    var Connection = class extends EventEmitter {
      constructor(url, options) {
        super();
        this.url = url;
        this.options = options = options || {};
        this.mimeType = options.mimeType || defaultMimeType;
        this._responseHandlers = {};
        this._reader = options.reader || this._getDefaultReader(this.mimeType);
        this._writer = options.writer || this._getDefaultWriter(this.mimeType);
        this._openPromise = null;
        this._openCallback = null;
        this._closePromise = null;
        this._closeCallback = null;
        this._pingInterval = null;
        this._pongTimeout = null;
        this._header = String.fromCharCode(this.mimeType.length) + this.mimeType;
        this._header_buf = Buffer.from(this._header);
        this.isOpen = false;
        this.traversalSource = options.traversalSource || "g";
        this._authenticator = options.authenticator;
        this._pingEnabled = this.options.pingEnabled === false ? false : true;
        this._pingIntervalDelay = this.options.pingInterval || pingIntervalDelay;
        this._pongTimeoutDelay = this.options.pongTimeout || pongTimeoutDelay;
        if (this.options.connectOnStartup) {
          console.warn(
            "connectOnStartup is now deprecated and non-functional. To open a connection, please call open() after instantiating connection object."
          );
        }
      }
      open() {
        if (this.isOpen) {
          return Promise.resolve();
        }
        if (this._openPromise) {
          return this._openPromise;
        }
        this.emit("log", "ws open");
        this._ws = new WebSocket(this.url, {
          headers: this.options.headers,
          ca: this.options.ca,
          cert: this.options.cert,
          pfx: this.options.pfx,
          rejectUnauthorized: this.options.rejectUnauthorized
        });
        this._ws.on("message", (data) => this._handleMessage(data));
        this._ws.on("close", (code, message) => this._handleClose(code, message));
        this._ws.on("pong", () => {
          this.emit("log", "ws pong received");
          if (this._pongTimeout) {
            clearTimeout(this._pongTimeout);
            this._pongTimeout = null;
          }
        });
        this._ws.on("ping", () => {
          this.emit("log", "ws ping received");
          this._ws.pong();
        });
        return this._openPromise = new Promise((resolve, reject) => {
          this._ws.on("open", () => {
            this.isOpen = true;
            if (this._pingEnabled) {
              this._pingHeartbeat();
            }
            resolve();
          });
          this._ws.on("error", (err) => {
            this._handleError(err);
            reject(err);
          });
        });
      }
      submit(processor, op, args, requestId) {
        const rid = requestId || utils.getUuid();
        return this.open().then(
          () => new Promise((resolve, reject) => {
            if (op !== "authentication") {
              this._responseHandlers[rid] = {
                callback: (err, result) => err ? reject(err) : resolve(result),
                result: null
              };
            }
            const request = {
              requestId: rid,
              op: op || "bytecode",
              processor: !processor && op !== "eval" ? "traversal" : processor,
              args: args || {}
            };
            const request_buf = this._writer.writeRequest(request);
            const message = Buffer.concat([this._header_buf, request_buf]);
            this._ws.send(message);
          })
        );
      }
      stream(processor, op, args, requestId) {
        const rid = requestId || utils.getUuid();
        const readableStream = new Stream.Readable({
          objectMode: true,
          read() {
          }
        });
        this._responseHandlers[rid] = {
          callback: (err) => err ? readableStream.destroy(err) : readableStream.push(null),
          result: readableStream
        };
        this.open().then(() => {
          const request = {
            requestId: rid,
            op: op || "bytecode",
            processor: !processor && op !== "eval" ? "traversal" : processor,
            args: args || {}
          };
          const request_buf = this._writer.writeRequest(request);
          const message = Buffer.concat([this._header_buf, request_buf]);
          this._ws.send(message);
        }).catch((err) => readableStream.destroy(err));
        return readableStream;
      }
      _getDefaultReader(mimeType) {
        if (mimeType === graphBinaryMimeType) {
          return graphBinaryReader;
        }
        return mimeType === graphSON2MimeType ? new serializer.GraphSON2Reader() : new serializer.GraphSONReader();
      }
      _getDefaultWriter(mimeType) {
        if (mimeType === graphBinaryMimeType) {
          return graphBinaryWriter;
        }
        return mimeType === graphSON2MimeType ? new serializer.GraphSON2Writer() : new serializer.GraphSONWriter();
      }
      _pingHeartbeat() {
        if (this._pingInterval) {
          clearInterval(this._pingInterval);
          this._pingInterval = null;
        }
        this._pingInterval = setInterval(() => {
          if (this.isOpen === false) {
            if (this._pingInterval) {
              clearInterval(this._pingInterval);
              this._pingInterval = null;
            }
          }
          this._pongTimeout = setTimeout(() => {
            this._ws.terminate();
          }, this._pongTimeoutDelay);
          this._ws.ping();
        }, this._pingIntervalDelay);
      }
      _handleError(err) {
        this.emit("log", `ws error ${err}`);
        this._cleanupWebsocket(err);
        this.emit("socketError", err);
      }
      _handleClose(code, message) {
        this.emit("log", `ws close code=${code} message=${message}`);
        this._cleanupWebsocket();
        if (this._closeCallback) {
          this._closeCallback();
        }
        this.emit("close", code, message);
      }
      _handleMessage(data) {
        const response = this._reader.readResponse(data);
        if (response.requestId === null || response.requestId === void 0) {
          Object.keys(this._responseHandlers).forEach((requestId) => {
            const handler2 = this._responseHandlers[requestId];
            this._clearHandler(requestId);
            if (response.status !== void 0 && response.status.message) {
              return handler2.callback(
                new ResponseError(
                  util.format(
                    "Server error (no request information): %s (%d)",
                    response.status.message,
                    response.status.code
                  ),
                  response.status
                )
              );
            }
            return handler2.callback(
              new ResponseError(util.format("Server error (no request information): %j", response), response.status)
            );
          });
          return;
        }
        const handler = this._responseHandlers[response.requestId];
        if (!handler) {
          return;
        }
        if (response.status.code === responseStatusCode.authenticationChallenge && this._authenticator) {
          this._authenticator.evaluateChallenge(response.result.data).then((res) => this.submit(void 0, "authentication", res, response.requestId)).catch(handler.callback);
          return;
        } else if (response.status.code >= 400) {
          return handler.callback(
            new ResponseError(
              util.format("Server error: %s (%d)", response.status.message, response.status.code),
              response.status
            )
          );
        }
        const isStreamingResponse = handler.result instanceof Stream.Readable;
        switch (response.status.code) {
          case responseStatusCode.noContent:
            this._clearHandler(response.requestId);
            if (isStreamingResponse) {
              handler.result.push(new ResultSet(utils.emptyArray, response.status.attributes));
              return handler.callback(null);
            }
            return handler.callback(null, new ResultSet(utils.emptyArray, response.status.attributes));
          case responseStatusCode.partialContent:
            if (isStreamingResponse) {
              handler.result.push(new ResultSet(response.result.data, response.status.attributes));
              break;
            }
            handler.result = handler.result || [];
            handler.result.push.apply(handler.result, response.result.data);
            break;
          default:
            if (isStreamingResponse) {
              handler.result.push(new ResultSet(response.result.data, response.status.attributes));
              return handler.callback(null);
            }
            if (handler.result) {
              handler.result.push.apply(handler.result, response.result.data);
            } else {
              handler.result = response.result.data;
            }
            this._clearHandler(response.requestId);
            return handler.callback(null, new ResultSet(handler.result, response.status.attributes));
        }
      }
      _cleanupWebsocket(err) {
        if (this._pingInterval) {
          clearInterval(this._pingInterval);
        }
        this._pingInterval = null;
        if (this._pongTimeout) {
          clearTimeout(this._pongTimeout);
        }
        this._pongTimeout = null;
        Object.keys(this._responseHandlers).forEach((requestId) => {
          const handler = this._responseHandlers[requestId];
          const isStreamingResponse = handler.result instanceof Stream.Readable;
          if (isStreamingResponse) {
            handler.callback(null);
          } else {
            const cause = err ? err : new Error("Connection has been closed.");
            handler.callback(cause);
          }
        });
        this._ws.removeAllListeners();
        this._openPromise = null;
        this._closePromise = null;
        this.isOpen = false;
      }
      _clearHandler(requestId) {
        delete this._responseHandlers[requestId];
      }
      close() {
        if (this.isOpen === false) {
          return Promise.resolve();
        }
        if (!this._closePromise) {
          this._closePromise = new Promise((resolve) => {
            this._closeCallback = resolve;
            this._ws.close();
          });
        }
        return this._closePromise;
      }
    };
    module.exports = Connection;
  }
});
var require_client = __commonJS({
  "node_modules/gremlin/lib/driver/client.js"(exports, module) {
    var utils = require_utils();
    var Connection = require_connection();
    var Bytecode = require_bytecode();
    var Client = class {
      constructor(url, options = {}) {
        this._options = options;
        if (this._options.processor === "session") {
          this._options.session = options.session || utils.getUuid();
        }
        if (this._options.session) {
          this._options.processor = options.processor || "session";
        }
        this._connection = new Connection(url, options);
      }
      open() {
        return this._connection.open();
      }
      get isOpen() {
        return this._connection.isOpen;
      }
      submit(message, bindings, requestOptions) {
        const requestIdOverride = requestOptions && requestOptions.requestId;
        if (requestIdOverride) {
          delete requestOptions["requestId"];
        }
        const args = Object.assign(
          {
            gremlin: message,
            aliases: { g: this._options.traversalSource || "g" }
          },
          requestOptions
        );
        if (this._options.session && this._options.processor === "session") {
          args["session"] = this._options.session;
        }
        if (message instanceof Bytecode) {
          if (this._options.session && this._options.processor === "session") {
            return this._connection.submit("session", "bytecode", args, requestIdOverride);
          }
          return this._connection.submit("traversal", "bytecode", args, requestIdOverride);
        } else if (typeof message === "string") {
          args["bindings"] = bindings;
          args["language"] = "gremlin-groovy";
          args["accept"] = this._connection.mimeType;
          return this._connection.submit(this._options.processor || "", "eval", args, requestIdOverride);
        }
        throw new TypeError("message must be of type Bytecode or string");
      }
      stream(message, bindings, requestOptions) {
        const requestIdOverride = requestOptions && requestOptions.requestId;
        if (requestIdOverride) {
          delete requestOptions["requestId"];
        }
        const args = Object.assign(
          {
            gremlin: message,
            aliases: { g: this._options.traversalSource || "g" }
          },
          requestOptions
        );
        if (this._options.session && this._options.processor === "session") {
          args["session"] = this._options.session;
        }
        if (message instanceof Bytecode) {
          if (this._options.session && this._options.processor === "session") {
            return this._connection.stream("session", "bytecode", args, requestIdOverride);
          }
          return this._connection.stream("traversal", "bytecode", args, requestIdOverride);
        } else if (typeof message === "string") {
          args["bindings"] = bindings;
          args["language"] = "gremlin-groovy";
          args["accept"] = this._connection.mimeType;
          return this._connection.stream(this._options.processor || "", "eval", args, requestIdOverride);
        }
        throw new TypeError("message must be of type Bytecode or string");
      }
      close() {
        if (this._options.session && this._options.processor === "session") {
          const args = { session: this._options.session };
          return this._connection.submit(this._options.processor, "close", args, null).then(() => this._connection.close());
        }
        return this._connection.close();
      }
      addListener(event, handler) {
        this._connection.on(event, handler);
      }
      removeListener(event, handler) {
        this._connection.removeListener(event, handler);
      }
    };
    module.exports = Client;
  }
});
var require_driver_remote_connection = __commonJS({
  "node_modules/gremlin/lib/driver/driver-remote-connection.js"(exports, module) {
    var rcModule = require_remote_connection();
    var RemoteConnection = rcModule.RemoteConnection;
    var RemoteTraversal = rcModule.RemoteTraversal;
    var utils = require_utils();
    var Client = require_client();
    var Bytecode = require_bytecode();
    var OptionsStrategy = require_traversal_strategy().OptionsStrategy;
    var DriverRemoteConnection = class extends RemoteConnection {
      constructor(url, options = {}) {
        super(url, options);
        this._client = new Client(url, options);
      }
      open() {
        return this._client.open();
      }
      get isOpen() {
        return this._client.isOpen;
      }
      submit(bytecode) {
        const optionsStrategy = bytecode.sourceInstructions.find(
          (i) => i[0] === "withStrategies" && i[1] instanceof OptionsStrategy
        );
        const allowedKeys = ["evaluationTimeout", "scriptEvaluationTimeout", "batchSize", "requestId", "userAgent"];
        let requestOptions = void 0;
        if (optionsStrategy !== void 0) {
          requestOptions = {};
          const conf = optionsStrategy[1].configuration;
          for (const key in conf) {
            if (conf.hasOwnProperty(key) && allowedKeys.indexOf(key) > -1) {
              requestOptions[key] = conf[key];
            }
          }
        }
        return this._client.submit(bytecode, null, requestOptions).then((result) => new RemoteTraversal(result.toArray()));
      }
      createSession() {
        if (this.isSessionBound) {
          throw new Error("Connection is already bound to a session - child sessions are not allowed");
        }
        const copiedOptions = Object.assign({}, this.options);
        copiedOptions.session = utils.getUuid();
        return new DriverRemoteConnection(this.url, copiedOptions);
      }
      get isSessionBound() {
        return this.options.session;
      }
      commit() {
        return this._client.submit(Bytecode.GraphOp.commit, null);
      }
      rollback() {
        return this._client.submit(Bytecode.GraphOp.rollback, null);
      }
      close() {
        return this._client.close();
      }
      addListener(...args) {
        return this._client.addListener(...args);
      }
      removeListener(...args) {
        return this._client.removeListener(...args);
      }
    };
    module.exports = DriverRemoteConnection;
  }
});
var require_authenticator = __commonJS({
  "node_modules/gremlin/lib/driver/auth/authenticator.js"(exports, module) {
    var Authenticator = class {
      constructor(options) {
        this._options = options;
      }
      evaluateChallenge(challenge) {
        throw new Error("evaluateChallenge should be implemented");
      }
    };
    module.exports = Authenticator;
  }
});
var require_sasl_mechanism_base = __commonJS({
  "node_modules/gremlin/lib/driver/auth/mechanisms/sasl-mechanism-base.js"(exports, module) {
    var SaslMechanismBase = class {
      constructor(options) {
        this.setopts(options);
      }
      get name() {
        return null;
      }
      setopts(options) {
        this._options = options;
      }
      evaluateChallenge(challenge) {
        throw new Error("evaluateChallenge should be implemented");
      }
    };
    module.exports = SaslMechanismBase;
  }
});
var require_sasl_mechanism_plain = __commonJS({
  "node_modules/gremlin/lib/driver/auth/mechanisms/sasl-mechanism-plain.js"(exports, module) {
    var SaslMechanismBase = require_sasl_mechanism_base();
    var SaslMechanismPlain = class extends SaslMechanismBase {
      constructor(options) {
        super(options);
        if (this._options.username === void 0 || this._options.username === null || this._options.username.length === 0 || this._options.password === void 0 || this._options.password === null || this._options.password.length === 0) {
          throw new Error("Missing credentials for SASL PLAIN mechanism");
        }
      }
      get name() {
        return "PLAIN";
      }
      evaluateChallenge(challenge) {
        if (this._hasInitialResponse(challenge)) {
          return Promise.resolve({
            saslMechanism: this.name,
            sasl: this._saslArgument(this._options.authzid, this._options.username, this._options.password)
          });
        }
        return Promise.resolve({
          sasl: this._saslArgument(this._options.authzid, this._options.username, this._options.password)
        });
      }
      _saslArgument(authzid, username, password) {
        if (authzid === void 0 || authzid === null) {
          authzid = "";
        }
        if (username === void 0 || username === null) {
          username = "";
        }
        if (password === void 0 || password.length === null) {
          password = "";
        }
        return Buffer.from(`${authzid}\0${username}\0${password}`).toString("base64");
      }
      _hasInitialResponse(challenge) {
        if (challenge === void 0 || challenge === null) {
          return false;
        }
        return true;
      }
    };
    module.exports = SaslMechanismPlain;
  }
});
var require_plain_text_sasl_authenticator = __commonJS({
  "node_modules/gremlin/lib/driver/auth/plain-text-sasl-authenticator.js"(exports, module) {
    var Authenticator = require_authenticator();
    var SaslMechanismPlain = require_sasl_mechanism_plain();
    var PlainTextSaslAuthenticator = class extends Authenticator {
      constructor(username, password, authzid) {
        const options = {
          mechanism: new SaslMechanismPlain({
            username,
            password,
            authzid
          })
        };
        super(options);
      }
      evaluateChallenge(challenge) {
        return this._options.mechanism.evaluateChallenge(challenge);
      }
    };
    module.exports = PlainTextSaslAuthenticator;
  }
});
var require_anonymous_traversal = __commonJS({
  "node_modules/gremlin/lib/process/anonymous-traversal.js"(exports, module) {
    var graphTraversalModule = require_graph_traversal();
    var TraversalStrategies = require_traversal_strategy().TraversalStrategies;
    var GraphTraversalSource = graphTraversalModule.GraphTraversalSource;
    var Graph = require_graph().Graph;
    var AnonymousTraversalSource = class {
      constructor(traversalSourceClass) {
        this.traversalSourceClass = traversalSourceClass;
      }
      static traversal(traversalSourceClass) {
        return new AnonymousTraversalSource(traversalSourceClass || GraphTraversalSource);
      }
      withRemote(remoteConnection) {
        return this.withGraph(new Graph()).withRemote(remoteConnection);
      }
      withGraph(graph) {
        return new this.traversalSourceClass(graph, new TraversalStrategies());
      }
    };
    module.exports = AnonymousTraversalSource;
  }
});
var require_gremlin = __commonJS({
  "node_modules/gremlin/index.js"(exports, module) {
    var t = require_traversal();
    var gt = require_graph_traversal();
    var strategiesModule = require_traversal_strategy();
    var graph = require_graph();
    var gs = require_graph_serializer();
    var rc = require_remote_connection();
    var Bytecode = require_bytecode();
    var Translator = require_translator();
    var utils = require_utils();
    var DriverRemoteConnection = require_driver_remote_connection();
    var ResponseError = require_response_error();
    var Client = require_client();
    var ResultSet = require_result_set();
    var Authenticator = require_authenticator();
    var PlainTextSaslAuthenticator = require_plain_text_sasl_authenticator();
    var AnonymousTraversalSource = require_anonymous_traversal();
    module.exports = {
      driver: {
        RemoteConnection: rc.RemoteConnection,
        RemoteStrategy: rc.RemoteStrategy,
        RemoteTraversal: rc.RemoteTraversal,
        ResponseError,
        DriverRemoteConnection,
        Client,
        ResultSet,
        auth: {
          Authenticator,
          PlainTextSaslAuthenticator
        }
      },
      process: {
        Bytecode,
        EnumValue: t.EnumValue,
        P: t.P,
        TextP: t.TextP,
        Traversal: t.Traversal,
        TraversalSideEffects: t.TraversalSideEffects,
        TraversalStrategies: strategiesModule.TraversalStrategies,
        TraversalStrategy: strategiesModule.TraversalStrategy,
        Traverser: t.Traverser,
        barrier: t.barrier,
        cardinality: t.cardinality,
        column: t.column,
        direction: t.direction,
        operator: t.operator,
        order: t.order,
        pick: t.pick,
        pop: t.pop,
        scope: t.scope,
        t: t.t,
        GraphTraversal: gt.GraphTraversal,
        GraphTraversalSource: gt.GraphTraversalSource,
        statics: gt.statics,
        Translator,
        traversal: AnonymousTraversalSource.traversal,
        AnonymousTraversalSource,
        withOptions: t.withOptions
      },
      structure: {
        io: gs,
        Edge: graph.Edge,
        Graph: graph.Graph,
        Path: graph.Path,
        Property: graph.Property,
        Vertex: graph.Vertex,
        VertexProperty: graph.VertexProperty,
        toLong: utils.toLong
      }
    };
  }
});
require_gremlin();
