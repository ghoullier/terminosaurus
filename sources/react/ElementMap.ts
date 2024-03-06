/* eslint-disable @typescript-eslint/naming-convention */

import React, {LegacyRef}    from 'react';

import {TermElement}         from '#sources/dom/TermElement';
import {TermCanvas}          from '#sources/elements/TermCanvas';
import {TermEditor}          from '#sources/elements/TermEditor';
import {TermInput}           from '#sources/elements/TermInput';
import {EventOf, EventSlot}  from '#sources/misc/EventSource';
import {AllPropertiesInputs} from '#sources/style/styleProperties';
import { TermPty } from '../elements/TermPty';
import { TermButton } from '..';

type HasChildren = {children?: React.ReactNode};

type AllReactEventsFor<T extends object> = {
  [K in keyof T as T[K] extends EventSlot<any, any, any> ? K : never]?: (e: EventOf<T[K]>) => void;
};

type PropSetFn<T extends string> = `set${Capitalize<T>}`;
type PropResetFn<T extends string> = `reset${Capitalize<T>}`;

type CheckIsProp<T extends object, K extends string> = T extends {
  [_ in PropSetFn<K>]: Function;
} & {
  [_ in PropResetFn<K>]: Function;
} ? any : never;

type AllReactPropsFor<T extends object> = {
  key?: string;
  ref?: React.Ref<T>;
} & Partial<AllPropertiesInputs> & {
  [K in Extract<keyof T, string> as K extends CheckIsProp<T, K> ? K : never]?: T[K];
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'term:button': AllReactPropsFor<TermButton> & AllReactEventsFor<TermButton> & HasChildren;
      'term:div': AllReactPropsFor<TermElement> & AllReactEventsFor<TermElement> & HasChildren;
      'term:editor': AllReactPropsFor<TermEditor> & AllReactEventsFor<TermEditor>;
      'term:input': AllReactPropsFor<TermInput> & AllReactEventsFor<TermInput>;
      'term:pty': AllReactPropsFor<TermPty> & AllReactEventsFor<TermPty>;
    }
  }
}

export const ElementMap = new Map([
  [`term:button`, TermButton],
  [`term:div`, TermElement],
  [`term:editor`, TermEditor],
  [`term:input`, TermInput],
  [`term:pty`, TermPty],
]);
