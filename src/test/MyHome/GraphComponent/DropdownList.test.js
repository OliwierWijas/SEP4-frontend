import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react"
import DropdownList from "../../../components/MyHome/GraphComponent/DropdownList"

describe('DropdownList Component', () => {
    it('renders with default value', () => {
        render(<DropdownList selectedValue="Temperature" />);
        expect(screen.getByDisplayValue('Temperature')).toBeInTheDocument();
    });

    it('calls setSelectedValue when dropdown value changes', () => {
        const setSelectedValueMock = jest.fn()
        render(<DropdownList selectedValue="Temperature" setSelectedValue={setSelectedValueMock} />)

        fireEvent.change(screen.getByDisplayValue('Temperature'), { target: { value: 'Humidity' } })

        expect(setSelectedValueMock).toHaveBeenCalledWith('Humidity')
        expect(setSelectedValueMock).toHaveBeenCalledTimes(1)

        fireEvent.change(screen.getByDisplayValue('Temperature'), { target: { value: 'Light Level' } })

        expect(setSelectedValueMock).toHaveBeenCalledWith('Light Level')
        expect(setSelectedValueMock).toHaveBeenCalledTimes(2)
    })
})