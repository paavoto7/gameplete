

const ZodErrorHandler = (result, c) => {
    if (!result.success) {
        return c.json({ error: result.error.issues?.[0].message }, 400);
    }
}

export default ZodErrorHandler;