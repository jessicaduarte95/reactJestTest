import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './list'

// test('sum', () => {
//     const { getByText } =  render(<App />)
//     expect(getByText('Hello World!')).toBeTruthy()

    // toBeTruthy: retorna um valor não falso, ou seja, que consiga encontrar, neste caso, "Hello World!".
    // toBeInTheDocument: verifica se está no documento.
    // toHaveAttribute: verifica se tem determinado atributo
    // Todos que começam com getBy retornará um único elemento e todos que começamm com getAll retornará todos os elementos relacionados.
    // Os que começam com querie não falham caso eu não encontre o elemento. No get caso eu não encontre o elemento, ele falhará.
    // O find é parecido com o get, porém ele espera o elemento aparecer em tela.
// })


describe('App Component', () => {
    it('Should render list items', () => {
        const { getByText, rerender } = render(<List initialItem={['João', 'Maria', 'Josefina']}/>)
        expect(getByText('João')).toBeInTheDocument()
        expect(getByText('Maria')).toBeInTheDocument()
        expect(getByText('Josefina')).toBeInTheDocument()

        rerender(<List initialItem={['Julia']}/>)
        
        expect(screen.queryByText('Josefina')).toBeInTheDocument()
    })

    it('Should be able to add new items to the list', async () => {
        const { getByText, debug, getByPlaceholderText, findByText } = render(<List initialItem={[]}/>)
        const inputElement = getByPlaceholderText("Novo Item")
        const addButton = getByText('Adicionar')

        await userEvent.type(inputElement, 'Novo')

        debug()
        await userEvent.click(addButton)
        debug()

        expect(await findByText('Novo')).toBeInTheDocument()

        // Outra Forma de fazer
        // await waitFor( () => {
        //     expect(getByText('Novo')).toBeInTheDocument()
        // })
    })

    it('Should be able to remove item to the list', async () => {
        const { getByText, getAllByText } = render(<List initialItem={['João']}/>)
        const removeButtons = getAllByText('Remover')

        await userEvent.click(removeButtons[0])

        await waitForElementToBeRemoved(() => {
            return getByText('João')
        })

        // Outra Forma de fazer
        
        // await waitFor(() => {
        //     expect(queryByText('João')).not.toBeInTheDocument()
        // })
    })
})