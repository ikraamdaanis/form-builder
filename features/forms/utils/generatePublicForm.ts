import { Form } from "database/schema";
import { PublicForm } from "features/forms/types";

/**
 * Takes a Form and removes fields that are not needed for the public such as
 * submissions, visits, userId, and formSubmissions.
 */
export function generatePublicForm(form: Form): PublicForm {
  return {
    id: form.id,
    content: form.content,
    createdAt: form.createdAt,
    description: form.description,
    name: form.name,
    published: form.published,
    shareUrl: form.shareUrl,
    updatedAt: form.updatedAt
  };
}
