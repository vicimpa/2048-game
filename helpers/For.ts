import { ReactNode, Fragment, createElement } from "react";

interface IFor<T> {
  of?: T[]
  children?: ((v: T, i: number) => ReactNode) | ReactNode
}

export const For = function<T>(props: IFor<T>) {
  const {of = [], children} = props

  if(typeof children == 'function') {
    return createElement(
      Fragment, 
      {}, 
      ...of.map((e, i) => children(e, i))
    )
  } 

  return createElement(
    Fragment,
    {},
    ...of.map((e, i) => children)
  )
}