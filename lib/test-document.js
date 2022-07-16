module.exports = class TestDocument {
  constructor(data) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key]
        this[key] = element
      }
    }
  }

  lean() {
    return { ...this }
  }

  toObject() {
    return { ...this }
  }

  populate(field) {
    return this
  }
}
