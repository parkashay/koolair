import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';

const embed_form = `<iframe id="basin-form" src="https://usebasin.com/form/c59b9136fcaf/view/ed682ccd6e0c?iframe=true" allowtransparency="true" frameborder="0" style={"border: none; overflow: hidden;}" onload="var self = this; self.contentWindow.postMessage('getHeight', '*');  setInterval(function() { self.contentWindow.postMessage('getHeight', '*'); }, 500); window.addEventListener('message', function(event) { if (event.data.action === 'setHeight') { self.style.height = (event.data.height + 50) + 'px'; } });" width="100%"></iframe>`;

export default function ContactUsForm() {
    return (
        <div
            dangerouslySetInnerHTML={{__html: embed_form}}
        />
    )
};

