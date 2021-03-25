import React, { useState } from "react"
import { Button, HStack } from "@chakra-ui/react"


interface Props {
  showBest?: boolean
  onChange: any
}

export const StoryFilters = (props:Props) => {
  const {showBest=true,onChange} = props
  let initFilter = 'Best'
  let filters = ['Recent','Week','Month','Year','Latest']
  if (!showBest) {
      initFilter = 'Recent'
  } else {
      filters.unshift('Best')
  }

  const [filter, setFilter] = useState(initFilter)
  
  const changeFilter = f => {
      onChange(f)
      setFilter(f)
  }

  return (
    <HStack spacing="0">
      {
        filters.map(f => 
          <Button key={f} _focus={null} onClick={() => changeFilter(f)} size="sm" colorScheme={filter === f ? 'teal' : null} variant="ghost" >
            {f}
          </Button>)
      }
    </HStack>
  )
}

export default StoryFilters
