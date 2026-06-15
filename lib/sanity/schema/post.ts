import { defineType, defineField } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'status', type: 'string', title: 'Status', options: { list: ['draft', 'published'] }, initialValue: 'draft' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published at' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt' }),
    defineField({ name: 'cover', type: 'image', title: 'Cover Image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'array', title: 'Body', of: [{type: 'block'}, {type: 'image'}] })
  ]
});
