import React, { act } from 'react'
import { render, screen } from "@testing-library/react"
import DataReadingComponent from "../../../components/MyHome/GraphComponent/DataReadingComponent"

describe('DataReadingComponent', () => {
    it('renders with default values', () => {
        render(<DataReadingComponent readingType="Temperature" value="25" />);
        expect(screen.getByText('Temperature:')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
    })
})

