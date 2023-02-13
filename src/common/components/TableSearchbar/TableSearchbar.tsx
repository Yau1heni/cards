import React, { FC, useState } from 'react'
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

type tableSearchBarType = {
  onChange: (searchValue: string) => void
}

export const TableSearchBar: FC<tableSearchBarType> = ({ onChange }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchBarValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(e.currentTarget.value)
    onChange(e.currentTarget.value)
  }

  const handleCloseSearching = () => {
    setSearchValue('')
    onChange('')
  }

  const searchBarIcons =
    searchValue.length > 0 ? <CloseIcon onClick={handleCloseSearching} /> : <SearchIcon />
  return (
    <FormControl sx={{ width: '25ch' }} variant="standard">
      <InputLabel htmlFor="table-search-bar">Search</InputLabel>
      <Input
        id="table-search-bar"
        value={searchValue}
        onChange={handleChangeSearchBarValue}
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>{searchBarIcons}</IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
