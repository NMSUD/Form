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

  toSpec(): OpenAPIV3_1.Document {
    const spec: OpenAPIV3_1.Document = {
      openapi: '3.1.0',
      info: {
        title: 'NMSUD Form API',
        summary: 'API functions for you to test',
        description: 'How the API for receiving data from the NMSUD Form UI works',
        termsOfService: 'https://nmsud.com/terms_and_conditions.html', // TODO
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
