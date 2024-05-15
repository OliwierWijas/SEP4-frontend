import { render, screen } from '@testing-library/react'
import TextBox from '../../components/SignUp/TextBoxComponent.js'

describe('TextBox component', () => {
    it('renders title and textArray', () => {
        const title = 'Sample Title'
        const textArray = ['Text 1', 'Text 2']

        render(<TextBox title={title} textArray={textArray} />)

        const titleElement = screen.getByText(title)
        expect(titleElement).toBeInTheDocument()

        textArray.forEach(text => {
            const textElement = screen.getByText(text)
            expect(textElement).toBeInTheDocument()
        })
    })

    it('renders nothing if title or textArray is not provided', () => {
        render(<TextBox />)
        const textBoxElement = screen.queryByTestId('textbox')
        expect(textBoxElement).toBeNull()
    })

    it('renders nothing if title is not provided', () => {
        const textArray = ['Text 1', 'Text 2']

        render(<TextBox textArray={textArray} />)
        const textBoxElement = screen.queryByTestId('textbox')
        expect(textBoxElement).toBeNull()
    })

    it('renders nothing if textArray is not provided', () => {
        const title = 'Sample Title'

        render(<TextBox title={title} />)
        const textBoxElement = screen.queryByTestId('textbox')
        expect(textBoxElement).toBeNull()
    })
})
