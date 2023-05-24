import { InputState, InputStateStyleObject } from '../types';
import { getInputStylesFromState } from './getInputStylesFromState';

export interface IInputStyles<T> {
  [key: string]: T;
}

const withState = '_withState';

export const inputStylesheet = {
  _initStyles: {} as IInputStyles<string | InputStateStyleObject>,
  _styles: {} as IInputStyles<string>,
  _state: {} as InputState,
  _updateStyles: function () {
    /************************************************************************************ 
      Styles nested in the '_withState' property will be processed with the current state
      via the 'getInputStylesFromState' function
    ************************************************************************************/

    const stylesToProcess = this._initStyles[withState] as InputStateStyleObject;

    if (stylesToProcess) {
      const processedStyles = getInputStylesFromState(stylesToProcess, this._state);
      this._styles = {
        ...this._initStyles,
        ...processedStyles,
      } as IInputStyles<string>;
    };

    return this;
  },
  create: function (styles: IInputStyles<string | InputStateStyleObject>) {
    this._initStyles = styles;
    return this;
  },
  updateState: function (state: InputState) {
    this._state = state;
    return this._updateStyles();
  },
  get styles() {
    return this._styles;
  },
}
