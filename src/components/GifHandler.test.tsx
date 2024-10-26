import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import GifHandler from './GifHandler'

describe('GifHandler Component tests', () => {
    it('renders a gif image', () => {
        render(<GifHandler gifUrl="https://i.imgur.com/Jw7WhXd.gif" altText='front-page-image' />);

        const gif = screen.getByRole('img');

        expect(gif).toBeInTheDocument();
    });

    it('renders an alt-text', () => {
        render(<GifHandler gifUrl="https://i.imgur.com/Jw7WhXd.gif" altText='front-page-image' />);

        const text = screen.getByAltText('front-page-image');

        expect(text).toBeInTheDocument();
    });

    it('renders alt text, when image url is fake', () => {
        render(<GifHandler gifUrl="example.com/text.gif" altText='front-page-image' />);

        const text = screen.getByAltText('front-page-image');

        expect(text).toBeInTheDocument();
    });
});