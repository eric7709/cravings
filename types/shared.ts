import React from "react";
export type TOption = {
  label: string;
  value: string;
};

export type PromiseVoid = Promise<void>;
export type PromiseNumber = Promise<number>;
export type PromiseString = Promise<string>;
export type PromiseBoolean = Promise<boolean>;


export type Children = {
  children: React.ReactNode;
};
