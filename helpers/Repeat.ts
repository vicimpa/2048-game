import { FC, ReactNode, Fragment, createElement } from "react";

interface IRepeat {
  count?: number
  children?: ((v: number) => ReactNode) | ReactNode
}

export const Repeat: FC<IRepeat> = ({
  count = 0,
  children
}) => {
  const array = [...new Array(count)]
  if(typeof children == 'function') {
    return createElement(
      Fragment, 
      {}, 
      ...array.map((e, i) => children(i))
    )
  } 

  return createElement(
    Fragment,
    {},
    ...array.map((e, i) => children)
  )
}