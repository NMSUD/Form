import { OpenAPIV3_1 } from 'openapi-types';

import { site } from '@constants/site';
import { getVersionNumFromPackageJson } from '@helpers/fileHelper';
import { getConfig } from '@services/internal/configService';

export class SwaggerBuilder {
  private paths = {};
  private components = {};

  addPath(path: OpenAPIV3_1.PathItemObject) {
    this.paths = {
      ...this.paths,
      ...path,
    };
  }

  addComponent(component: Record<string, OpenAPIV3_1.SchemaObject>) {
    this.components = {
      ...this.components,
      ...component,
    };
  }

  getCustomCss = (): string => `
    .swagger-ui .topbar .download-url-wrapper {
      display: none;
    }

    tr.response:not([data-code^='2']) .model-example {
      display: none;
    }

    table td:nth-child(3) {
      display: none;
    }
  `;

  toSpec(): OpenAPIV3_1.Document {
    const spec: OpenAPIV3_1.Document = {
      openapi: '3.1.0',
      info: {
        title: 'NMSUD Form API',
        summary: 'An "easy to use" way of interacting with the API powering the NMSUD Form UI',
        termsOfService: getConfig().getNmsUdFormDocsUrl() + '/misc/terms_and_conditions.html',
        contact: {
          name: site.nmsud.name,
          url: site.nmsud.website,
          email: site.nmsud.email,
        },
        license: {
          name: 'GNU General Public License v3.0',
          identifier: 'GPL-3.0',
          url: 'https://github.com/NMSUD/Form/blob/main/LICENCE.md',
        },
        version: getVersionNumFromPackageJson(),
      },
      paths: this.paths,
      components: {
        schemas: this.components,
      },
    };
    return spec;
  }
}
