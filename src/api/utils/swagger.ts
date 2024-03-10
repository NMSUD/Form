import { OpenAPIV3_1 } from 'openapi-types';
import * as fs from 'fs';
import path from 'path';

import { site } from '@constants/site';
import { getBotPath } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';

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

  private _getVersionNum(): string {
    try {
      const packageJsonFile = path.join(getBotPath(), '../../package.json');
      const packageString = fs.readFileSync(packageJsonFile, 'utf8');
      const pkg = JSON.parse(packageString);
      return pkg.version;
    } catch (ex) {
      getLog().e(`Unable to get version from package.json. Err: ${ex}`);
      return '0.0.0';
    }
  }

  getCustomCss(): string {
    try {
      const swaggerCustomStylesFile = path.join(getBotPath(), '../web/scss/_swagger.scss');
      const swaggerCustomStyles = fs.readFileSync(swaggerCustomStylesFile, 'utf8');
      return swaggerCustomStyles;
    } catch (ex) {
      getLog().e(`Unable to get custom styles from web/scss/_swagger.scss. Err: ${ex}`);
      return '';
    }
  }

  toSpec(): Record<string, unknown> {
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'NMSUD Form API',
        summary: 'A short summary of the API.', // TODO
        description:
          'A description of the API. CommonMark syntax MAY be used for rich text representation.', // TODO
        termsOfService: 'https://google.com', // TODO
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
        version: this._getVersionNum(),
      },
      paths: this.paths,
      components: {
        schemas: this.components,
      },
    };
    return spec;
  }
}
