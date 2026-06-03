import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from 'express';
import rateLimit from 'express-rate-limit';
import DBinit from './config/dbinit.js';
import cors from 'cors';

import profileRouter from './modules/user/profile.router.js';
import usersRouter from './modules/user/user.routes.js';
import postsRouter from './modules/post/post.routes.js';
import commentRouter from './modules/comment/comment.routes.js';

const app = express();

DBinit();

// Global rate limiter – 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Blog API is running' });
});

app.use('/profile_upload', profileRouter);
app.use('/auth', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentRouter);

// 404 handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

export default app;
