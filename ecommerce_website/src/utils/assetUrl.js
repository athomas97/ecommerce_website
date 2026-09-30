const productImageUrls = import.meta.glob('../assets/img/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function getProductImageUrl(path) {
  const filename = path.split('/').pop()
  return productImageUrls[`../assets/img/${filename}`] ?? ''
}