"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObjectRenderer = exports.MultipleObjectRenderer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _constants = require("@adalo/constants");

var _dependencies = require("../utils/dependencies");

var _visibility = require("../utils/visibility");

var _styles = require("../utils/styles");

var _Label = _interopRequireDefault(require("./Label"));

var _Section = _interopRequireDefault(require("./Section"));

var _Line = _interopRequireDefault(require("./Line"));

var _Ellipse = _interopRequireDefault(require("./Ellipse"));

var _Shape = _interopRequireDefault(require("./Shape"));

var _Image = _interopRequireDefault(require("./Image"));

var _Input = _interopRequireDefault(require("./Input"));

var _ImageUpload = _interopRequireDefault(require("./ImageUpload"));

var _FileUpload = _interopRequireDefault(require("./FileUpload"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _Select = _interopRequireDefault(require("./Select"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Form = _interopRequireDefault(require("./Form"));

var _WebView = _interopRequireDefault(require("./WebView"));

var _Group = _interopRequireDefault(require("./Group"));

var _List = _interopRequireWildcard(require("./List"));

var _Wrapper = _interopRequireDefault(require("./Wrapper"));

var _Row = _interopRequireDefault(require("./Row"));

var _Column = _interopRequireDefault(require("./Column"));

var _RowSpacer = _interopRequireDefault(require("./RowSpacer"));

var _ColumnSpacer = _interopRequireDefault(require("./ColumnSpacer"));

var _ComponentInstance = _interopRequireDefault(require("./ComponentInstance"));

var _LibraryComponent = _interopRequireDefault(require("./LibraryComponent"));

var _data = require("../ducks/data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const mapping = {
  [_constants.LABEL]: _Label.default,
  [_constants.SECTION]: _Section.default,
  [_constants.LINE]: _Line.default,
  [_constants.IMAGE]: _Image.default,
  [_constants.ELLIPSE]: _Ellipse.default,
  [_constants.SHAPE]: _Shape.default,
  [_constants.GROUP]: _Group.default,
  [_constants.WRAPPER]: _Wrapper.default,
  [_constants.ROW]: _Row.default,
  [_constants.COLUMN]: _Column.default,
  [_constants.LIST]: _List.default,
  [_constants.INPUT]: _Input.default,
  [_constants.IMAGE_UPLOAD]: _ImageUpload.default,
  [_constants.FILE_UPLOAD]: _FileUpload.default,
  [_constants.DATE_PICKER]: _DatePicker.default,
  [_constants.CHECKBOX]: _Checkbox.default,
  [_constants.FORM]: _Form.default,
  [_constants.SELECT]: _Select.default,
  [_constants.ROW_SPACER]: _RowSpacer.default,
  [_constants.COLUMN_SPACER]: _ColumnSpacer.default,
  [_constants.WEB_VIEW]: _WebView.default,
  [_constants.COMPONENT_INSTANCE]: _ComponentInstance.default,
  [_constants.LIBRARY_COMPONENT]: _LibraryComponent.default,
  listItem: _List.WrappedListItem
};

class ObjectRenderer extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderChildren", children => {
      let {
        active,
        component,
        topScreen
      } = this.props;

      if (children.filter(c => !c).length > 0) {
        const {
          object
        } = this.props;
        console.log('--------> INFO:', object);
        throw new Error('ENCOUNTERED NULL CHILD!');
      }

      return children.map(child => /*#__PURE__*/_react.default.createElement(WrappedObjectRenderer, {
        key: child.id,
        object: child,
        component: component,
        active: active,
        topScreen: topScreen
      }));
    });
  }

  render() {
    let {
      app,
      active,
      topScreen,
      component,
      object,
      bindingData,
      parentBindingData,
      isReusableComponent,
      visible,
      getBinding,
      getParams,
      getApp,
      getFileUploadsBaseURL,
      getImageUploadsBaseURL,
      onEnter,
      setUploading,
      formSubmitSuccess,
      state
    } = this.props;

    if (object.hidden || !visible) {
      return null;
    } // normalize all object attributes to their desired value


    if (app && app.branding) {
      object.attributes = (0, _styles.normalizeAttributes)(object.attributes, app.branding);
    }

    let baseProps = {
      isReusableComponent,
      app,
      component,
      object,
      active,
      bindingData,
      parentBindingData,
      topScreen,
      getBinding,
      getParams,
      getApp,
      renderChildren: this.renderChildren,
      getFileUploadsBaseURL,
      getImageUploadsBaseURL,
      onEnter,
      formSubmitSuccess
    };
    let ObjectClass = mapping[object.type];

    if (!ObjectClass) {
      console.warn(`I don't know how to render ${object.type}`);
      return null;
    }

    if (object.type === _constants.IMAGE_UPLOAD) {
      baseProps.setUploading = setUploading;
    } // in the event there is a navigation to render, lets prefetch the data


    Object.keys(object.actions).filter(id => object.actions[id].eventType === _constants.events.TAP).forEach(id => {
      object.actions[id].actions.forEach(a => {
        if (a.actionType === _constants.actionTypes.NAVIGATE) {
          try {
            // get target component
            let targetId = a.options.target;
            let app = getApp();
            let targetComponent = app.components[targetId];
            let dependencies = (0, _dependencies.getDependencies)(targetComponent, {
              formInputs: {},
              getDatasources: () => app && app.datasources || {},
              getApp,
              state
            });
            let dataBindings = {};
            dependencies.forEach(dep => {
              let {
                getBaseURL,
                appVersion,
                getStore
              } = this.context;
              return (0, _data.fetch)(getBaseURL(), { ...dep,
                datasource: this.getDatasource(dep.datasourceId),
                componentId: targetId,
                bindingIds: Object.keys(dataBindings),
                appVersion,
                state: getStore().getState(),
                getParams: this.getParams
              });
            });
          } catch (e) {
            console.error(e);
          }
        }
      });
    });
    return /*#__PURE__*/_react.default.createElement(ObjectClass, baseProps, object.children ? this.renderChildren(object.children) : null);
  }

}

exports.ObjectRenderer = ObjectRenderer;

const mapStateToProps = (state, props) => {
  let {
    object,
    getBinding,
    getBindingsList,
    getParams,
    getFileUploadsBaseURL,
    getImageUploadsBaseURL,
    getApp
  } = props;
  return {
    bindingData: (0, _dependencies.getObjectBinding)(state, object, {
      getParams,
      getBinding,
      getBindingsList,
      getFileUploadsBaseURL,
      getImageUploadsBaseURL,
      getApp
    }),
    visible: (0, _visibility.getVisible)(state, object, {
      getParams,
      getBinding,
      getBindingsList,
      getApp
    }),
    state
  };
};

const ConnectedObjectRenderer = (0, _reactRedux.connect)(mapStateToProps, {
  fetch: _data.fetch
})(ObjectRenderer);

class WrappedObjectRenderer extends _react.Component {
  render() {
    let {
      getApp
    } = this.context;
    let app = getApp();
    return /*#__PURE__*/_react.default.createElement(ConnectedObjectRenderer, _extends({}, this.props, this.context, {
      app: app
    }));
  }

}

exports.default = WrappedObjectRenderer;

_defineProperty(WrappedObjectRenderer, "contextTypes", {
  getBinding: _propTypes.default.func,
  getBindingsList: _propTypes.default.func,
  getParams: _propTypes.default.func,
  getApp: _propTypes.default.func,
  getFileUploadsBaseURL: _propTypes.default.func,
  getImageUploadsBaseURL: _propTypes.default.func
});

class MultipleObjectRenderer extends _react.Component {
  render() {
    let {
      objects,
      ...props
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, objects.map(obj => /*#__PURE__*/_react.default.createElement(WrappedObjectRenderer, _extends({}, props, {
      key: obj.id,
      object: obj
    }))));
  }

}

exports.MultipleObjectRenderer = MultipleObjectRenderer;
//# sourceMappingURL=ObjectRenderer.js.map