const { test, expect } = require('@jest/globals')
const { geturlfromhtml } = require('./crawl.js')

test('finding links.........', () => {
    expect(geturlfromhtml(`<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>`, 'https://blog.boot.dev')[0]).toBe('https://blog.boot.dev/')
})

test('finding links.........', () => {
    expect(geturlfromhtml(`<html><body><a href="/xyz.html"><span>Go to Boot.dev</span></a></body></html>`, 'https://blog.boot.dev')[0]).toBe('https://blog.boot.dev/xyz.html')
})