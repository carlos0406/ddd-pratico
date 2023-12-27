import Product from './product'

it('shoud throw error whe id is empty', () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prodcut = new Product('', 'Produto 1', 100)
  }).toThrow('Id é obrigatório')
})

it('shoud throw error whe name is empty', () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prodcut = new Product('abc', '', 100)
  }).toThrow('Nome é obrigatório')
})

it('shoud throw error whe price is less than zero', () => {
  expect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prodcut = new Product('abc', 'robson', -100)
  }).toThrow('Preço é obrigatório')
})

it('shoud change name', () => {
  const prodcut = new Product('abc', 'robson', 100)
  prodcut.changeName('robson2')
  expect(prodcut.name).toBe('robson2')
})

it('shoud change price', () => {
  const prodcut = new Product('abc', 'robson', 100)
  prodcut.changePrice(200)
  expect(prodcut.price).toBe(200)
})
