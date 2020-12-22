import Link from 'next/link';

interface RLink {
  text: string;
  href: string;
  as?: string;
}
/**
 * @name RouterLink
 * @description Used for internal/router navigation
 * @docs at {@link https://nextjs.org/docs/api-reference/next/link}
 */

const RLink: React.FC<RLink> = ({ href, text, as }) => (
  <Link as={as} href={href}>
    <a className='hover:bg-gray-light hover:text-black'>{text}</a>
  </Link>
);

interface ALink extends React.HTMLProps<HTMLAnchorElement> {
  text: string;
}

/**
 * @name AnchorLink
 * @description Used for external/remote navigation. `target` is _blank & `rel` set to noopener noreferrer.
 */

const ALink: React.FC<ALink> = ({ href, text }) => (
  <Link href={href}>
    <a target='_blank' ref='noopener noreferrer' href={href} className='hover:bg-gray-light hover:text-black'>
      {text}
    </a>
  </Link>
);
export { RLink, ALink };
